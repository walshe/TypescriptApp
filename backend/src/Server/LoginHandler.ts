import { IncomingMessage, ServerResponse } from "http";
import { stringify } from "querystring";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { countInstances } from "../Shared/ObjectsCounter";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Account, Handler, TokenGenerator } from "./Model";

@countInstances
export class LoginHandler extends BaseRequestHandler {
  private tokenGenerator: TokenGenerator;

  constructor(
    tokenGenerator: TokenGenerator
  ) {
    super()
    this.tokenGenerator = tokenGenerator;
  }

  private async handlePost() {
    try {
      const body = await super.getRequestBody();

      const sessionToken = await this.tokenGenerator.generateToken(body);
      if (sessionToken) {
        this.res!.statusCode = HTTP_CODES.CREATED;
        this.res!.writeHead(HTTP_CODES.CREATED, {
          "Content-Type": "application/json",
        });
        console.log("sessionToken", sessionToken);
        this.res!.write(JSON.stringify(sessionToken));
      } else {
        this.res!.statusCode = HTTP_CODES.NOT_FOUND;
        this.res!.write("bad creds");
      }
    } catch (error: any) {
      this.res!.write(`Error : ${error.message}`);
    }
  }

  public async handleRequest(): Promise<void> {
    switch (this.req!.method) {
      case HTTP_METHODS.OPTIONS:
        this.res!.writeHead(HTTP_CODES.OK)
        break;
      case HTTP_METHODS.POST:
        await this.handlePost();
        break;

      default:
        super.handleNotFound();
        break;
    }
  }

  
}
