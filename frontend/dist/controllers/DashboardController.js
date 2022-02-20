var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AccessRight } from "../model/AuthenticationModel";
import { DataService } from "../services/DataService";
import { BaseController } from "./BaseController";
export class DashboardController extends BaseController {
    constructor() {
        super(...arguments);
        this.dataService = new DataService();
    }
    setSessionToken(sessionToken) {
        this.sessionToken = sessionToken;
    }
    createView() {
        const title = this.createElement("h2", "Dashboard");
        if (this.sessionToken) {
            this.createElement("label", `Welcome ${this.sessionToken.username}`);
            this.insertBreak();
            this.generateButtons();
        }
        else {
            this.createElement("label", "not logged in");
        }
        return this.container;
    }
    generateButtons() {
        if (this.sessionToken) {
            for (const accessRight of this.sessionToken.accessRights) {
                this.createElement("button", AccessRight[accessRight], () => __awaiter(this, void 0, void 0, function* () {
                    console.log("button");
                    yield this.triggerAction(accessRight);
                }));
            }
            if (this.sessionToken.accessRights.includes(AccessRight.READ)) {
                this.insertBreak();
                this.createElement("label", "search:");
                this.searchArea = this.createElement("input");
                this.searchResultArea = this.createElement("div");
            }
        }
    }
    triggerAction(accessRight) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (accessRight) {
                case AccessRight.CREATE:
                    break;
                case AccessRight.READ:
                    const users = yield this.dataService.getUsers(this.sessionToken.tokenId, this.searchArea.value);
                    for (const user of users) {
                        const label = this.createElement("label", JSON.stringify(user));
                        label.onclick = () => {
                            label.classList.toggle("selectedLabel");
                            this.selectedUser = user;
                            this.selectedLabel = label;
                        };
                        this.searchResultArea.append(label);
                        this.searchResultArea.append(document.createElement("br"));
                    }
                    break;
                case AccessRight.DELETE:
                    if (this.selectedUser) {
                        yield this.dataService.deleteUser(this.sessionToken.tokenId, this.selectedUser.id);
                        this.selectedLabel.innerHTML = ''; //rudimentary clear 
                    }
                    break;
                default:
                    break;
            }
        });
    }
}
//# sourceMappingURL=DashboardController.js.map