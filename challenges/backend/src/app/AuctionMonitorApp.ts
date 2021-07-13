import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient"
import "reflect-metadata";


@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        // TODO: Retrieve auctions and display aggregated information (see README.md)

        var carOnSaleClient = new CarOnSaleClient()
        const runningAuctionsStats = await carOnSaleClient.getRunningAuctions()
        console.log(runningAuctionsStats)
    }

}
