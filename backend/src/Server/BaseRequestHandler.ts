import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES } from "../Shared/Model";

export abstract class BaseRequestHandler {
  protected req: IncomingMessage | undefined;
  protected res: ServerResponse | undefined;

  constructor(){
        
  }
  
  abstract handleRequest(): Promise<void>;

  public setRequest(req: IncomingMessage){
    this.req = req
  }

  public setResponse(res: ServerResponse){
    this.res = res
  }

  protected handleNotFound() {
    this.res!.statusCode = HTTP_CODES.NOT_FOUND;
    this.res!.write("not found");
  }

  protected async getRequestBody(): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.req!.on("data", (data: String) => {
        body += data;
      });
      this.req!.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      this.req!.on("error", (err) => {
        reject(err);
      });
    });
  }

  protected respondJsonObject(code: HTTP_CODES, object :any){
    this.res!.writeHead(code, {
        "Content-Type": "application/json",
      });
      this.res!.write(JSON.stringify(object));    
  }

  protected respondBadRequest(message: string){
    this.res!.statusCode = HTTP_CODES.BAD_REQUEST;
    this.res!.write(message);
  }

  protected respondText(code: HTTP_CODES, text: string){
    this.res!.statusCode = code;
    this.res!.write(text);
  }

  protected respondUnauthorized(){
    this.res!.statusCode = HTTP_CODES.UNAUTHORIZED
    this.res!.write('Unauthorized');
  }
}
