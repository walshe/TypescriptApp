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
const usersUrl = `${baseUrl}/users`;
export class DataService {
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
//# sourceMappingURL=DataService.js.map