var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";
import { LinkTextValue } from "./Decorators";
export class LoginController extends BaseController {
    constructor() {
        super(...arguments);
        this.loginService = new LoginService();
        this.title = this.createElement("h2", "Please Login");
        this.username = this.createElement("label", "Username");
        this.usernameInput = this.createElement("input");
        this.breakEl = this.createElement("br");
        this.password = this.createElement("label", "Password");
        this.passwordInput = this.createElement("input");
        this.b1 = this.createElement("br");
        this.loginButton = this.createElement("button", "Login", () => __awaiter(this, void 0, void 0, function* () {
            if (this.usernameInput.value && this.passwordInput.value) {
                //this.resetErrorLabel();
                this.errorLabelText = '';
                const sessionToken = yield this.loginService.login(this.usernameInput.value, this.passwordInput.value);
                if (sessionToken) {
                    this.router.switchToDashboardView(sessionToken);
                }
                else {
                    this.errorLabelText = "Invalid username or password";
                }
            }
            else {
                this.errorLabelText = "please enter username and password";
            }
        }));
        this.b2 = this.createElement("br");
        this.error = this.createElement("label");
        this.errorLabelText = '';
    }
    //   private resetErrorLabel() {
    //     this.error.style.visibility = "hidden";
    //     this.error.innerText = "";
    //   }
    //   private showErrorLabel(message: string) {
    //     this.error.innerText = message;
    //     this.error.style.color = "red";
    //     this.error.style.visibility = "visible";
    //   }
    createView() {
        this.error.id = 'errorLabel';
        this.error.style.color = 'red';
        this.passwordInput.type = "Password";
        return this.container;
    }
}
__decorate([
    LinkTextValue('errorLabel')
], LoginController.prototype, "errorLabelText", void 0);
//# sourceMappingURL=LoginController.js.map