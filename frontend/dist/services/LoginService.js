var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
export class LoginService {
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
//# sourceMappingURL=LoginService.js.map