import { BaseController } from "./BaseController";
export class MainController extends BaseController {
    createView() {
        const title = this.createElement("h2", "Welcome to our main page");
        const article = this.createElement("div", "ajhsdgfkjahgsdfkj jahsg dfkjhgakshjdfgkajhg sdfjhkg ajhsdg f");
        const button = this.createElement("button", "Login", () => {
            this.router.switchToLoginView();
        });
        return this.container;
    }
}
//# sourceMappingURL=MainController.js.map