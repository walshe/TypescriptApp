import { Router } from "./Router";
export class Main {
    constructor() {
        console.log("test");
        this.router = new Router();
    }
    launchApp() {
        this.router.handleRequest();
    }
}
new Main().launchApp();
// # sourceMappingURL=Main.js.map
//# sourceMappingURL=Main.js.map