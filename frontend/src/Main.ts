import { Router } from "./Router"

export class Main{
    
    private router: Router 

    public constructor(){
        console.log("test")
        this.router = new Router();
    }

    public launchApp(){
        this.router.handleRequest()
    }
    
}

new Main().launchApp()
// # sourceMappingURL=Main.js.map