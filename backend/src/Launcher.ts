import { Server } from './Server/Server'

class Launcher {

    server: Server;

    constructor() {
        this.server = new Server();
    }

    public launchApp() {
        console.log('started app');
        this.server.createServer()
    }
}

const launcher: Launcher = new Launcher()

launcher.launchApp();