import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { injectable } from "inversify";
import "reflect-metadata";
import fetch from 'node-fetch';
import config from "../../../config/Config";


@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor() {
    }


    public async getRunningAuctions(): Promise<object> {
        let authentication = await this._getAuthenticated()
        let runningAuctionsStats = await this._getAuctions(authentication.token, authentication.userId)

        return runningAuctionsStats
    }

    private async _getAuthenticated(): Promise<{ token: string, userId: string }> {
        const baseUrl = config.api.baseUrl
        const userMailId = config.credential.testUser.userMailId
        const password = config.credential.testUser.password
        const endpoint = `/v1/authentication/${encodeURIComponent(userMailId)}`
        const url = baseUrl + endpoint
        const headers = {
            'content-type': 'application/json'
        }
        const body = JSON.stringify({
            password: password,
            meta: 'string'
        })

        const res = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body
        })
        if (res.status !== 201) {
            console.log(`Could not authenticate user. userMailId: ${userMailId}`)
            process.exit(-1)
        }

        let resJSON = await res.json()
        const token = resJSON.token
        const userId = resJSON.userId

        return { token: token, userId: userId }
    }

    private async _getAuctions(token: string, userId: string): Promise<object> {
        const baseUrl = config.api.baseUrl
        const endpoint = `/v1/auction/salesman/${encodeURIComponent(userId)}/purchases`
        const url = baseUrl + endpoint
        const headers = {
            'content-type': 'application/json',
            'authtoken': token,
            'userId': userId
        }

        // TODO: Use filter in the request

        const res = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        if (res.status !== 200) {
            console.log(`Could not get auctions. userId: ${userId}`)
            process.exit(-1)
        }

        let auctions = await res.json()

        const dateNow = Date.now()

        let runningAuctions = auctions.filter((auction: any) => new Date(auction.endingTime).getTime() > dateNow)
        const totalRunningAuctions = runningAuctions.length

        let totalBids = runningAuctions.reduce((total: number, auction: any) => total + auction.numBids, 0)
        let averageBid = totalBids / totalRunningAuctions

        // If auction.minimumRequiredAsk == Null then take it as an 100% ratio.
        let totalAuctionProgress = runningAuctions.reduce((total: number, auction: any) =>
            total + (auction.currentHighestBidValue) / (auction.minimumRequiredAsk || auction.currentHighestBidValue) * 100, 0)
        let averageAuctionProgress = totalAuctionProgress / totalRunningAuctions

        return {
            totalRunningAuctions: totalRunningAuctions,
            averageBid: averageBid,
            averageAuctionProgress: averageAuctionProgress
        }
    }

}