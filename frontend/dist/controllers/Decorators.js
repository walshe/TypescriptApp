export function LinkTextValue(elementId) {
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
//# sourceMappingURL=Decorators.js.map