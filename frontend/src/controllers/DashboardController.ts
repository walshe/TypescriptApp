import { AccessRight, SessionToken } from "../model/AuthenticationModel";
import { User } from "../model/DataModels";
import { DataService } from "../services/DataService";
import { BaseController } from "./BaseController";

export class DashboardController extends BaseController {
  private sessionToken: SessionToken | undefined;

  private searchArea: HTMLInputElement | undefined;
  private searchResultArea: HTMLDivElement | undefined;

  private dataService: DataService = new DataService();

  private selectedUser: User | undefined;
  private selectedLabel: HTMLLabelElement | undefined;

  public setSessionToken(sessionToken: SessionToken) {
    this.sessionToken = sessionToken;
  }

  public createView(): HTMLDivElement {
    const title = this.createElement("h2", "Dashboard");
    if (this.sessionToken) {
      this.createElement("label", `Welcome ${this.sessionToken.username}`);
      this.insertBreak();
      this.generateButtons();
    } else {
      this.createElement("label", "not logged in");
    }

    return this.container;
  }

  private generateButtons() {
    if (this.sessionToken) {
      for (const accessRight of this.sessionToken.accessRights) {
        this.createElement("button", AccessRight[accessRight], async () => {
          console.log("button");
          await this.triggerAction(accessRight);
        });
      }
      if (this.sessionToken.accessRights.includes(AccessRight.READ)) {
        this.insertBreak();
        this.createElement("label", "search:");
        this.searchArea = this.createElement("input");
        this.searchResultArea = this.createElement("div");
      }
    }
  }

  private async triggerAction(accessRight: AccessRight) {
    switch (accessRight) {
      case AccessRight.CREATE:
        break;

      case AccessRight.READ:
        const users = await this.dataService.getUsers(
          this.sessionToken!.tokenId,
          this.searchArea!.value
        );
        for (const user of users) {
          const label = this.createElement("label", JSON.stringify(user));
          label.onclick = () => {
            label.classList.toggle("selectedLabel");
            this.selectedUser = user;
            this.selectedLabel = label
          };
          this.searchResultArea!.append(label);
          this.searchResultArea!.append(document.createElement("br"));
        }

        break;

      case AccessRight.DELETE:
        if (this.selectedUser) {
          await this.dataService.deleteUser(
            this.sessionToken!.tokenId,
            this.selectedUser!.id
          );
          this.selectedLabel!.innerHTML = '' //rudimentary clear 

        }

        break;

      default:
        break;
    }
  }
}
