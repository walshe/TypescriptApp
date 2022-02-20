/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Router.ts":
/*!***********************!*\
  !*** ./src/Router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/DashboardController */ "./src/controllers/DashboardController.ts");
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/LoginController */ "./src/controllers/LoginController.ts");


class Router {
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
            const loginController = new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__.LoginController(this);
            this.mainElement.append(loginController.createView());
        }
    }
    switchToDashboardView(sessionToken) {
        if (this.mainElement) {
            this.mainElement.innerHTML = "";
            const dashboardController = new _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__.DashboardController(this);
            if (sessionToken) {
                dashboardController.setSessionToken(sessionToken);
            }
            this.mainElement.append(dashboardController.createView());
        }
    }
}


/***/ }),

/***/ "./src/controllers/BaseController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/BaseController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseController": () => (/* binding */ BaseController)
/* harmony export */ });
class BaseController {
    constructor(router) {
        this.container = document.createElement("div");
        this.router = router;
    }
    createElement(elementTpe, innerText, action) {
        const element = document.createElement(elementTpe);
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }
    insertBreak() {
        this.createElement('br');
    }
}


/***/ }),

/***/ "./src/controllers/DashboardController.ts":
/*!************************************************!*\
  !*** ./src/controllers/DashboardController.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardController": () => (/* binding */ DashboardController)
/* harmony export */ });
/* harmony import */ var _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/AuthenticationModel */ "./src/model/AuthenticationModel.ts");
/* harmony import */ var _services_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/DataService */ "./src/services/DataService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class DashboardController extends _BaseController__WEBPACK_IMPORTED_MODULE_2__.BaseController {
    constructor() {
        super(...arguments);
        this.dataService = new _services_DataService__WEBPACK_IMPORTED_MODULE_1__.DataService();
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
                this.createElement("button", _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__.AccessRight[accessRight], () => __awaiter(this, void 0, void 0, function* () {
                    console.log("button");
                    yield this.triggerAction(accessRight);
                }));
            }
            if (this.sessionToken.accessRights.includes(_model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ)) {
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
                case _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__.AccessRight.CREATE:
                    break;
                case _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ:
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
                case _model_AuthenticationModel__WEBPACK_IMPORTED_MODULE_0__.AccessRight.DELETE:
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


/***/ }),

/***/ "./src/controllers/Decorators.ts":
/*!***************************************!*\
  !*** ./src/controllers/Decorators.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkTextValue": () => (/* binding */ LinkTextValue)
/* harmony export */ });
function LinkTextValue(elementId) {
    return function (target, key) {
        let property = target[key];
        const getter = () => {
            return property;
        };
        const setter = (newValue) => {
            const element = document.getElementById(elementId);
            property = newValue;
            if (element) {
                element.innerText = newValue;
                if (!newValue) {
                    element.style.visibility = "visible";
                }
                else {
                    element.style.visibility = "hidden";
                }
            }
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true,
        });
    };
}


/***/ }),

/***/ "./src/controllers/LoginController.ts":
/*!********************************************!*\
  !*** ./src/controllers/LoginController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginController": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _services_LoginService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/LoginService */ "./src/services/LoginService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
/* harmony import */ var _Decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Decorators */ "./src/controllers/Decorators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class LoginController extends _BaseController__WEBPACK_IMPORTED_MODULE_1__.BaseController {
    constructor() {
        super(...arguments);
        this.loginService = new _services_LoginService__WEBPACK_IMPORTED_MODULE_0__.LoginService();
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
    (0,_Decorators__WEBPACK_IMPORTED_MODULE_2__.LinkTextValue)('errorLabel')
], LoginController.prototype, "errorLabelText", void 0);


/***/ }),

/***/ "./src/model/AuthenticationModel.ts":
/*!******************************************!*\
  !*** ./src/model/AuthenticationModel.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessRight": () => (/* binding */ AccessRight)
/* harmony export */ });
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight || (AccessRight = {}));


/***/ }),

/***/ "./src/services/DataService.ts":
/*!*************************************!*\
  !*** ./src/services/DataService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = "http://localhost:8080";
const usersUrl = `${baseUrl}/users`;
class DataService {
    getUsers(authentication, nameQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${usersUrl}?name=${nameQuery}`;
            let options = {
                method: 'GET',
                headers: {
                    Authorization: authentication
                }
            };
            const result = yield fetch(url, options);
            return yield result.json();
        });
    }
    deleteUser(authentication, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${usersUrl}?id=${id}`;
            let options = {
                method: 'DELETE',
                headers: {
                    Authorization: authentication
                }
            };
            const result = yield fetch(url, options);
            if (result.status == 200) {
                return yield result.json();
            }
            else {
                return undefined;
            }
        });
    }
}


/***/ }),

/***/ "./src/services/LoginService.ts":
/*!**************************************!*\
  !*** ./src/services/LoginService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginService": () => (/* binding */ LoginService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
class LoginService {
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            };
            const result = yield fetch(loginUrl, options);
            if (result.status == 201) {
                return yield result.json();
            }
            else {
                return undefined;
            }
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "./src/Router.ts");

class Main {
    constructor() {
        console.log("test");
        this.router = new _Router__WEBPACK_IMPORTED_MODULE_0__.Router();
    }
    launchApp() {
        this.router.handleRequest();
    }
}
new Main().launchApp();
// # sourceMappingURL=Main.js.map

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUUxQixNQUFNLElBQUk7SUFJYjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwyQ0FBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLFNBQVM7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtJQUMvQixDQUFDO0NBRUo7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUN0QixpQ0FBaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvY29udHJvbGxlcnMvQmFzZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvY29udHJvbGxlcnMvRGFzaGJvYXJkQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb250cm9sbGVycy9EZWNvcmF0b3JzLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbnRyb2xsZXJzL0xvZ2luQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9tb2RlbC9BdXRoZW50aWNhdGlvbk1vZGVsLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL3NlcnZpY2VzL0RhdGFTZXJ2aWNlLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL3NlcnZpY2VzL0xvZ2luU2VydmljZS50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGFzaGJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL0Rhc2hib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IExvZ2luQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL0xvZ2luQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWFpbiB9IGZyb20gXCIuL01haW5cIjtcbmltcG9ydCB7IFNlc3Npb25Ub2tlbiB9IGZyb20gXCIuL21vZGVsL0F1dGhlbnRpY2F0aW9uTW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xuXG4gIHB1YmxpYyBoYW5kbGVSZXF1ZXN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlIHJlcXVlc3QgZm9yIFwiICsgdGhpcy5nZXRSb3V0ZSgpKTtcblxuICAgIHN3aXRjaCAodGhpcy5nZXRSb3V0ZSgpKSB7XG4gICAgICBjYXNlIFwiL2Zyb250ZW5kL2xvZ2luXCI6XG4gICAgICAgIHRoaXMuc3dpdGNoVG9Mb2dpblZpZXcoKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZnJvbnRlbmQvZGFzaGJvYXJkXCI6XG4gICAgICAgIHRoaXMuc3dpdGNoVG9EYXNoYm9hcmRWaWV3KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGlmICh0aGlzLm1haW5FbGVtZW50KSB7XG4gICAgICAgIC8vICAgY29uc3QgbWFpbkNvbnRyb2xsZXIgPSBuZXcgTWFpbkNvbnRyb2xsZXIodGhpcyk7XG4gICAgICAgIC8vICAgdGhpcy5tYWluRWxlbWVudC5hcHBlbmQobWFpbkNvbnRyb2xsZXIuY3JlYXRlVmlldygpKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFJvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzd2l0Y2hUb0xvZ2luVmlldygpIHtcbiAgICBpZiAodGhpcy5tYWluRWxlbWVudCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29uc3QgbG9naW5Db250cm9sbGVyID0gbmV3IExvZ2luQ29udHJvbGxlcih0aGlzKTtcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQuYXBwZW5kKGxvZ2luQ29udHJvbGxlci5jcmVhdGVWaWV3KCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzd2l0Y2hUb0Rhc2hib2FyZFZpZXcoc2Vzc2lvblRva2VuIDogU2Vzc2lvblRva2VuIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMubWFpbkVsZW1lbnQpIHtcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGNvbnN0IGRhc2hib2FyZENvbnRyb2xsZXIgPSBuZXcgRGFzaGJvYXJkQ29udHJvbGxlcih0aGlzKTtcbiAgICAgIGlmKHNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgZGFzaGJvYXJkQ29udHJvbGxlci5zZXRTZXNzaW9uVG9rZW4oc2Vzc2lvblRva2VuKVxuICAgICAgfVxuICAgICAgdGhpcy5tYWluRWxlbWVudC5hcHBlbmQoZGFzaGJvYXJkQ29udHJvbGxlci5jcmVhdGVWaWV3KCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uL1JvdXRlclwiXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29udHJvbGxlcntcblxuICAgIHByb3RlY3RlZCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICBwcm90ZWN0ZWQgcm91dGVyIDogUm91dGVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKXtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXJcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlVmlldygpIDpIVE1MRGl2RWxlbWVudFxuXG4gICAgcHVibGljIGNyZWF0ZUVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4oZWxlbWVudFRwZTogSywgaW5uZXJUZXh0PyA6IHN0cmluZywgYWN0aW9uPzogYW55KTogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tde1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHBlKVxuICAgICAgICBpZihpbm5lclRleHQpe1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBpbm5lclRleHRcbiAgICAgICAgfVxuICAgICAgICBpZihhY3Rpb24pe1xuICAgICAgICAgICAgZWxlbWVudC5vbmNsaWNrID0gYWN0aW9uXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGVsZW1lbnQpXG4gICAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluc2VydEJyZWFrKCl7XG4gICAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCgnYnInKVxuICAgIH1cbn0iLCJpbXBvcnQgeyBBY2Nlc3NSaWdodCwgU2Vzc2lvblRva2VuIH0gZnJvbSBcIi4uL21vZGVsL0F1dGhlbnRpY2F0aW9uTW9kZWxcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWwvRGF0YU1vZGVsc1wiO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvRGF0YVNlcnZpY2VcIjtcbmltcG9ydCB7IEJhc2VDb250cm9sbGVyIH0gZnJvbSBcIi4vQmFzZUNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvblRva2VuOiBTZXNzaW9uVG9rZW4gfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBzZWFyY2hBcmVhOiBIVE1MSW5wdXRFbGVtZW50IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHNlYXJjaFJlc3VsdEFyZWE6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlID0gbmV3IERhdGFTZXJ2aWNlKCk7XG5cbiAgcHJpdmF0ZSBzZWxlY3RlZFVzZXI6IFVzZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc2VsZWN0ZWRMYWJlbDogSFRNTExhYmVsRWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgc2V0U2Vzc2lvblRva2VuKHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSBzZXNzaW9uVG9rZW47XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlVmlldygpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIkRhc2hib2FyZFwiKTtcbiAgICBpZiAodGhpcy5zZXNzaW9uVG9rZW4pIHtcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIGBXZWxjb21lICR7dGhpcy5zZXNzaW9uVG9rZW4udXNlcm5hbWV9YCk7XG4gICAgICB0aGlzLmluc2VydEJyZWFrKCk7XG4gICAgICB0aGlzLmdlbmVyYXRlQnV0dG9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBcIm5vdCBsb2dnZWQgaW5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZUJ1dHRvbnMoKSB7XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjY2Vzc1JpZ2h0IG9mIHRoaXMuc2Vzc2lvblRva2VuLmFjY2Vzc1JpZ2h0cykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgQWNjZXNzUmlnaHRbYWNjZXNzUmlnaHRdLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJidXR0b25cIik7XG4gICAgICAgICAgYXdhaXQgdGhpcy50cmlnZ2VyQWN0aW9uKGFjY2Vzc1JpZ2h0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZXNzaW9uVG9rZW4uYWNjZXNzUmlnaHRzLmluY2x1ZGVzKEFjY2Vzc1JpZ2h0LlJFQUQpKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QnJlYWsoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgXCJzZWFyY2g6XCIpO1xuICAgICAgICB0aGlzLnNlYXJjaEFyZWEgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRBcmVhID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdHJpZ2dlckFjdGlvbihhY2Nlc3NSaWdodDogQWNjZXNzUmlnaHQpIHtcbiAgICBzd2l0Y2ggKGFjY2Vzc1JpZ2h0KSB7XG4gICAgICBjYXNlIEFjY2Vzc1JpZ2h0LkNSRUFURTpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQWNjZXNzUmlnaHQuUkVBRDpcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJzKFxuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuIS50b2tlbklkLFxuICAgICAgICAgIHRoaXMuc2VhcmNoQXJlYSEudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHVzZXJzKSB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgICAgbGFiZWwub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZExhYmVsXCIpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gbGFiZWxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0QXJlYSEuYXBwZW5kKGxhYmVsKTtcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdEFyZWEhLmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQWNjZXNzUmlnaHQuREVMRVRFOlxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXIpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVVzZXIoXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiEudG9rZW5JZCxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyIS5pZFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsIS5pbm5lckhUTUwgPSAnJyAvL3J1ZGltZW50YXJ5IGNsZWFyIFxuXG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW5rVGV4dFZhbHVlKGVsZW1lbnRJZDogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBCYXNlQ29udHJvbGxlciwga2V5OiBzdHJpbmcpIHtcbiAgICBsZXQgcHJvcGVydHkgPSAodGFyZ2V0IGFzIGFueSlba2V5XTtcblxuICAgIGNvbnN0IGdldHRlciA9ICgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0dGVyID0gKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICAgICAgcHJvcGVydHkgPSBuZXdWYWx1ZTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gbmV3VmFsdWU7XG4gICAgICAgIGlmICghbmV3VmFsdWUpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICBzZXQ6IHNldHRlcixcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvTG9naW5TZXJ2aWNlXCI7XG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBMaW5rVGV4dFZhbHVlIH0gZnJvbSBcIi4vRGVjb3JhdG9yc1wiO1xuXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBwcml2YXRlIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlID0gbmV3IExvZ2luU2VydmljZSgpO1xuXG4gIHByaXZhdGUgdGl0bGUgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIlBsZWFzZSBMb2dpblwiKTtcblxuICBwcml2YXRlIHVzZXJuYW1lID0gdGhpcy5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgXCJVc2VybmFtZVwiKTtcblxuICBwcml2YXRlIHVzZXJuYW1lSW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICBwcml2YXRlIGJyZWFrRWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcblxuICBwcml2YXRlIHBhc3N3b3JkID0gdGhpcy5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgXCJQYXNzd29yZFwiKTtcblxuICBwcml2YXRlIHBhc3N3b3JkSW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICBwcml2YXRlIGIxID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG5cbiAgcHJpdmF0ZSBsb2dpbkJ1dHRvbiA9IHRoaXMuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIkxvZ2luXCIsIGFzeW5jICgpID0+IHtcbiAgICBpZiAodGhpcy51c2VybmFtZUlucHV0LnZhbHVlICYmIHRoaXMucGFzc3dvcmRJbnB1dC52YWx1ZSkge1xuICAgICAgLy90aGlzLnJlc2V0RXJyb3JMYWJlbCgpO1xuICAgICAgdGhpcy5lcnJvckxhYmVsVGV4dCA9ICcnXG4gICAgICBjb25zdCBzZXNzaW9uVG9rZW4gPSBhd2FpdCB0aGlzLmxvZ2luU2VydmljZS5sb2dpbihcbiAgICAgICAgdGhpcy51c2VybmFtZUlucHV0LnZhbHVlLFxuICAgICAgICB0aGlzLnBhc3N3b3JkSW5wdXQudmFsdWVcbiAgICAgICk7XG5cbiAgICAgIGlmIChzZXNzaW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIuc3dpdGNoVG9EYXNoYm9hcmRWaWV3KHNlc3Npb25Ub2tlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yTGFiZWxUZXh0ID0gXCJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXJyb3JMYWJlbFRleHQgPSBcInBsZWFzZSBlbnRlciB1c2VybmFtZSBhbmQgcGFzc3dvcmRcIlxuICAgIH1cbiAgfSk7XG5cbiAgcHJpdmF0ZSBiMiA9IHRoaXMuY3JlYXRlRWxlbWVudChcImJyXCIpO1xuXG4gIHByaXZhdGUgZXJyb3IgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICBATGlua1RleHRWYWx1ZSgnZXJyb3JMYWJlbCcpXG4gIHByaXZhdGUgZXJyb3JMYWJlbFRleHQgOnN0cmluZyA9ICcnXG5cbi8vICAgcHJpdmF0ZSByZXNldEVycm9yTGFiZWwoKSB7XG4vLyAgICAgdGhpcy5lcnJvci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbi8vICAgICB0aGlzLmVycm9yLmlubmVyVGV4dCA9IFwiXCI7XG4vLyAgIH1cblxuLy8gICBwcml2YXRlIHNob3dFcnJvckxhYmVsKG1lc3NhZ2U6IHN0cmluZykge1xuLy8gICAgIHRoaXMuZXJyb3IuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbi8vICAgICB0aGlzLmVycm9yLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbi8vICAgICB0aGlzLmVycm9yLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbi8vICAgfVxuXG4gIHB1YmxpYyBjcmVhdGVWaWV3KCk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICB0aGlzLmVycm9yLmlkICA9J2Vycm9yTGFiZWwnXG4gICAgdGhpcy5lcnJvci5zdHlsZS5jb2xvciAgPSdyZWQnXG4gICAgdGhpcy5wYXNzd29yZElucHV0LnR5cGUgPSBcIlBhc3N3b3JkXCI7XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cbn1cbiIsImV4cG9ydCBlbnVtIEFjY2Vzc1JpZ2h0e1xuICAgIENSRUFURSxcbiAgICBSRUFELFxuICAgIFVQREFURSxcbiAgICBERUxFVEVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uVG9rZW57XG4gICAgdG9rZW5JZDogc3RyaW5nXG4gICAgdXNlcm5hbWU6IHN0cmluZ1xuICAgIHZhbGlkOiBib29sZWFuXG4gICAgZXhwaXJhdGlvblRpbWU6IERhdGVcbiAgICBhY2Nlc3NSaWdodHMgOiBBY2Nlc3NSaWdodFtdXG59IiwiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbC9EYXRhTW9kZWxzXCJcblxuXG5jb25zdCBiYXNlVXJsIDogc3RyaW5nID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIlxuY29uc3QgdXNlcnNVcmwgOiBzdHJpbmcgPSBgJHtiYXNlVXJsfS91c2Vyc2BcblxuXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2V7XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0VXNlcnMoYXV0aGVudGljYXRpb246c3RyaW5nLCBuYW1lUXVlcnk6IHN0cmluZyk6IFByb21pc2U8VXNlcltdPntcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dXNlcnNVcmx9P25hbWU9JHtuYW1lUXVlcnl9YFxuXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAgJ0dFVCcgLFxuICAgICAgICAgICAgaGVhZGVycyA6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uIDogYXV0aGVudGljYXRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcblxuICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKVxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlVXNlcihhdXRoZW50aWNhdGlvbjpzdHJpbmcsIGlkIDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPntcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dXNlcnNVcmx9P2lkPSR7aWR9YFxuXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAgJ0RFTEVURScgLFxuICAgICAgICAgICAgaGVhZGVycyA6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uIDogYXV0aGVudGljYXRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcblxuICAgICAgICBpZihyZXN1bHQuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IFNlc3Npb25Ub2tlbiB9IGZyb20gXCIuLi9tb2RlbC9BdXRoZW50aWNhdGlvbk1vZGVsXCI7XG5cbmNvbnN0IGJhc2VVcmwgOiBzdHJpbmcgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiXG5jb25zdCBsb2dpblVybCA6IHN0cmluZyA9IGAke2Jhc2VVcmx9L2xvZ2luYFxuXG5leHBvcnQgY2xhc3MgTG9naW5TZXJ2aWNle1xuICAgIHB1YmxpYyBhc3luYyBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA6IFByb21pc2U8U2Vzc2lvblRva2VuIHwgdW5kZWZpbmVkPntcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogICdQT1NUJyAsXG4gICAgICAgICAgICBoZWFkZXJzIDoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaChsb2dpblVybCwgb3B0aW9ucylcblxuICAgICAgICBpZihyZXN1bHQuc3RhdHVzID09IDIwMSl7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIlxuXG5leHBvcnQgY2xhc3MgTWFpbntcbiAgICBcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyIFxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKVxuICAgICAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGF1bmNoQXBwKCl7XG4gICAgICAgIHRoaXMucm91dGVyLmhhbmRsZVJlcXVlc3QoKVxuICAgIH1cbiAgICBcbn1cblxubmV3IE1haW4oKS5sYXVuY2hBcHAoKVxuLy8gIyBzb3VyY2VNYXBwaW5nVVJMPU1haW4uanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9