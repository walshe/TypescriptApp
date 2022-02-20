import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";
import { LinkTextValue } from "./Decorators";

export class LoginController extends BaseController {
  private loginService: LoginService = new LoginService();

  private title = this.createElement("h2", "Please Login");

  private username = this.createElement("label", "Username");

  private usernameInput = this.createElement("input");

  private breakEl = this.createElement("br");

  private password = this.createElement("label", "Password");

  private passwordInput = this.createElement("input");

  private b1 = this.createElement("br");

  private loginButton = this.createElement("button", "Login", async () => {
    if (this.usernameInput.value && this.passwordInput.value) {
      //this.resetErrorLabel();
      this.errorLabelText = ''
      const sessionToken = await this.loginService.login(
        this.usernameInput.value,
        this.passwordInput.value
      );

      if (sessionToken) {
        this.router.switchToDashboardView(sessionToken);
      } else {
        this.errorLabelText = "Invalid username or password";
      }
    } else {
      this.errorLabelText = "please enter username and password"
    }
  });

  private b2 = this.createElement("br");

  private error = this.createElement("label");

  @LinkTextValue('errorLabel')
  private errorLabelText :string = ''

//   private resetErrorLabel() {
//     this.error.style.visibility = "hidden";
//     this.error.innerText = "";
//   }

//   private showErrorLabel(message: string) {
//     this.error.innerText = message;
//     this.error.style.color = "red";
//     this.error.style.visibility = "visible";
//   }

  public createView(): HTMLDivElement {
    this.error.id  ='errorLabel'
    this.error.style.color  ='red'
    this.passwordInput.type = "Password";

    return this.container;
  }
}
