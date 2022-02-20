import { DashboardController } from "./controllers/DashboardController";
import { LoginController } from "./controllers/LoginController";
export class Router {
    constructor() {
        this.mainElement = document.getElementById("main-container");
    }
    handleRequest() {
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
    getRoute() {
        return window.location.pathname;
    }
    switchToLoginView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = "";
            const loginController = new LoginController(this);
            this.mainElement.append(loginController.createView());
        }
    }
    switchToDashboardView(sessionToken) {
        if (this.mainElement) {
            this.mainElement.innerHTML = "";
            const dashboardController = new DashboardController(this);
            if (sessionToken) {
                dashboardController.setSessionToken(sessionToken);
            }
            this.mainElement.append(dashboardController.createView());
        }
    }
}
//# sourceMappingURL=Router.js.map