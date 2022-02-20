import { IncomingMessage, ServerResponse } from "http";
import { stringify } from "querystring";
import { AccessRight, HTTP_CODES, HTTP_METHODS, User } from "../Shared/Model";
import { countInstances } from "../Shared/ObjectsCounter";
import { UsersDBAccess } from "../User/UsersDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Account, Handler, TokenGenerator, TokenValidator } from "./Model";
import { Utils } from "./Utils";

@countInstances
export class UsersHandler extends BaseRequestHandler {
  private usersDbAccess: UsersDBAccess = new UsersDBAccess();
  private tokenValidator: TokenValidator;

  constructor(
    tokenValidator: TokenValidator
  ) {
    super();
    this.tokenValidator = tokenValidator;
  }

  private async handleGet() {
    try {
      const operationAuthorized = await this.operationAuthorized(
        AccessRight.READ
      );
      if (operationAuthorized) {
        const parsedUrl = Utils.getUrlParameters(this.req!.url);

        if (parsedUrl?.query.id) {
          const userId = parsedUrl?.query.id;

          const user = await this.usersDbAccess.getUserById(userId as string);
          if (user) {
            this.respondJsonObject(HTTP_CODES.OK, user);
          } else {
            this.handleNotFound();
          }
        } else if (parsedUrl?.query.name) {
          const userName = parsedUrl?.query.name;

          const user = await this.usersDbAccess.getUserByName(
            userName as string
          );
          if (user) {
            this.respondJsonObject(HTTP_CODES.OK, user);
          } else {
            this.handleNotFound();
          }
        } else {
          this.respondBadRequest("id or name not present in request");
        }
      } else {
        this.respondUnauthorized();
      }
    } catch (error: any) {
      this.res!.write(`Error : ${error.message}`);
    }
  }

  private async handlePut() {
    try {
      const operationAuthorized = await this.operationAuthorized(
        AccessRight.CREATE
      );
      if (operationAuthorized) {
        try {
          const user: User = await this.getRequestBody();

          await this.usersDbAccess.putUser(user);
          this.respondText(HTTP_CODES.CREATED, `User ${user.name} created`);
        } catch (error: any) {
          this.respondBadRequest(error.message);
        }
      } else {
        this.respondUnauthorized();
      }
    } catch (error: any) {
      this.res!.write(`Error : ${error.message}`);
    }
  }

  private async handleDelete() {
    try {
      const operationAuthorized = await this.operationAuthorized(
        AccessRight.DELETE
      );
      if (operationAuthorized) {
        try {
          const parsedUrl = Utils.getUrlParameters(this.req!.url);

          if (parsedUrl?.query.id) {
            const userId = parsedUrl?.query.id;

            const deleted = await this.usersDbAccess.deleteUserById(userId as string);
            if(deleted === true){ 
              this.respondText(HTTP_CODES.OK, `User ${userId} deleted`);
            }else{
              this.respondText(HTTP_CODES.NOT_FOUND, `User ${userId} not found`);
            }

            
          }else{
            this.handleNotFound()
          }
        } catch (error: any) {
          this.respondBadRequest(error.message);
        }
      } else {
        this.respondUnauthorized();
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
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;
      case HTTP_METHODS.PUT:
        await this.handlePut();
        break;
      case HTTP_METHODS.DELETE:
        await this.handleDelete();
        break;

      default:
        this.handleNotFound();
        break;
    }
  }

  private async operationAuthorized(operation: AccessRight): Promise<boolean> {
    const tokenId = this.req!.headers.authorization;
    if (tokenId) {
      const tokenRights = await this.tokenValidator.validateToken(tokenId);
      if (tokenRights.accessRights.includes(operation)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
