export class BaseController {
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
//# sourceMappingURL=BaseController.js.map