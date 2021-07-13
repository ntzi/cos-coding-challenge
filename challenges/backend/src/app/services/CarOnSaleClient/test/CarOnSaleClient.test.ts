import { expect } from 'chai'
import { CarOnSaleClient } from '../classes/CarOnSaleClient'


describe("CarOnSaleClient", () => {
    // Test the class Delivery for different input answers.

    describe("_getAuthenticated", () => {
        context('Authenticate user', () => {
            it("should return token and userId", async () => {                
                let carOnSaleClient = new CarOnSaleClient()
                let authentication = await (carOnSaleClient as any)._getAuthenticated();
                
                let expectedUserId = 'salesman@random.com'

                expect(authentication.userId).to.eql(expectedUserId);
            });
        });
    }),
    describe("_getAuctions", () => {
        context('Get auctions', () => {
            it("should return token and userId", async () => {

                let carOnSaleClient = new CarOnSaleClient()
                let authentication = await (carOnSaleClient as any)._getAuthenticated();
                let auctions = await (carOnSaleClient as any)._getAuctions(authentication.token, authentication.userId);
                
                expect(auctions.totalRunningAuctions).to.be.a('number')
                expect(auctions.averageBid).to.be.a('number')
                expect(auctions.averageAuctionProgress).to.be.a('number')

            });
        });
    })
})