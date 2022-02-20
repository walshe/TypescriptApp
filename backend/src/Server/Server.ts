// A from scratch non-express server

import { createServer, IncomingMessage, request, ServerResponse } from "http";
import { LoginHandler } from "./LoginHandler";
import { Utils } from "./Utils";

import { Authorizor } from "./Authorization/Authorizor";
import { UsersHandler } from "./UsersHandler";
import { Monitor } from "../Shared/ObjectsCounter";

export class Server {
  private authorizor: Authorizor = new Authorizor();
  private loginHandler: LoginHandler = new LoginHandler(this.authorizor)
  private userHandler: UsersHandler = new UsersHandler(this.authorizor)

  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {

      this.addCorsHeader(res);

      console.log(`Got request from ${req.url}`);
      const basePath = Utils.getUrlBasePath(req.url);
      switch (basePath) {
        case "monitor":
          res.write(Monitor.printInstances())
        case "login":
          this.loginHandler.setRequest(req)
          this.loginHandler.setResponse(res)
          this.loginHandler.handleRequest()
          break;
          case "users":
            this.userHandler.setRequest(req)
            this.userHandler.setResponse(res)
            this.userHandler.handleRequest()
            break;  

        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log("created server");
  }

  private addCorsHeader(res: ServerResponse){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
  }
}
