import { DashboardController } from "./controllers/DashboardController";
import { LoginController } from "./controllers/LoginController";
import { MainController } from "./controllers/MainController";
import { Main } from "./Main";
import { SessionToken } from "./model/AuthenticationModel";

export class Router {
  private mainElement = document.getElementById("main-container");

  public handleRequest() {
    console.log("handle request for " + this.getRoute());

    switch (this.getRoute()) {
      case "/frontend/login":
        this.switchToLoginView();

        break;
      case "/frontend/dashboard":
        this.switchToDashboardView(undefined);

        break;

      default:
        // if (this.mainElement) {
        //   const mainController = new MainController(this);
        //   this.mainElement.append(mainController.createView());
        // }
        break;
    }
  }

  private getRoute(): string {
    return window.location.pathname;
  }

  public switchToLoginView() {
    if (this.mainElement) {
      this.mainElement.innerHTML = "";
      const loginController = new LoginController(this);
      this.mainElement.append(loginController.createView());
    }
  }

  public switchToDashboardView(sessionToken : SessionToken | undefined) {
    if (this.mainElement) {
      this.mainElement.innerHTML = "";
      const dashboardController = new DashboardController(this);
      if(sessionToken){
          dashboardController.setSessionToken(sessionToken)
      }
      this.mainElement.append(dashboardController.createView());
    }
  }
}
