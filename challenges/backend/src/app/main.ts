import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {AuctionMonitorApp} from "./AuctionMonitorApp";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);


/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
    process.on('exit', (code) => {
        console.log(`Exit with code: ${code}`);
      });      
})();
