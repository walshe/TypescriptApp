"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UsersHandler = void 0;
var Model_1 = require("../Shared/Model");
var UsersDBAccess_1 = require("../User/UsersDBAccess");
var BaseRequestHandler_1 = require("./BaseRequestHandler");
var Utils_1 = require("./Utils");
var UsersHandler = /** @class */ (function (_super) {
    __extends(UsersHandler, _super);
    function UsersHandler(req, res, tokenValidator) {
        var _this = _super.call(this, req, res) || this;
        _this.usersDbAccess = new UsersDBAccess_1.UsersDBAccess();
        _this.tokenValidator = tokenValidator;
        return _this;
    }
    UsersHandler.prototype.handleGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationAuthorized, parsedUrl, userId, user, userName, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.operationAuthorized(Model_1.AccessRight.READ)];
                    case 1:
                        operationAuthorized = _a.sent();
                        if (!operationAuthorized) return [3 /*break*/, 7];
                        parsedUrl = Utils_1.Utils.getUrlParameters(this.req.url);
                        if (!(parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.id)) return [3 /*break*/, 3];
                        userId = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.id;
                        return [4 /*yield*/, this.usersDbAccess.getUserById(userId)];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            this.respondJsonObject(Model_1.HTTP_CODES.OK, user);
                        }
                        else {
                            this.handleNotFound();
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.name)) return [3 /*break*/, 5];
                        userName = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.name;
                        return [4 /*yield*/, this.usersDbAccess.getUserByName(userName)];
                    case 4:
                        user = _a.sent();
                        if (user) {
                            this.respondJsonObject(Model_1.HTTP_CODES.OK, user);
                        }
                        else {
                            this.handleNotFound();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        this.respondBadRequest("id or name not present in request");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.respondUnauthorized();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        this.res.write("Error : ".concat(error_1.message));
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UsersHandler.prototype.handlePut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationAuthorized, user, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.operationAuthorized(Model_1.AccessRight.CREATE)];
                    case 1:
                        operationAuthorized = _a.sent();
                        if (!operationAuthorized) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getRequestBody()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.usersDbAccess.putUser(user)];
                    case 4:
                        _a.sent();
                        this.respondText(Model_1.HTTP_CODES.CREATED, "User ".concat(user.name, " created"));
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        this.respondBadRequest(error_2.message);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.respondUnauthorized();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_3 = _a.sent();
                        this.res.write("Error : ".concat(error_3.message));
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UsersHandler.prototype.handleDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var operationAuthorized, parsedUrl, userId, deleted, error_4, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.operationAuthorized(Model_1.AccessRight.DELETE)];
                    case 1:
                        operationAuthorized = _a.sent();
                        if (!operationAuthorized) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        parsedUrl = Utils_1.Utils.getUrlParameters(this.req.url);
                        if (!(parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.id)) return [3 /*break*/, 4];
                        userId = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query.id;
                        return [4 /*yield*/, this.usersDbAccess.deleteUserById(userId)];
                    case 3:
                        deleted = _a.sent();
                        if (deleted === true) {
                            this.respondText(Model_1.HTTP_CODES.OK, "User ".concat(userId, " deleted"));
                        }
                        else {
                            this.respondText(Model_1.HTTP_CODES.NOT_FOUND, "User ".concat(userId, " not found"));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.handleNotFound();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        this.respondBadRequest(error_4.message);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.respondUnauthorized();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_5 = _a.sent();
                        this.res.write("Error : ".concat(error_5.message));
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    UsersHandler.prototype.handleRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.req.method;
                        switch (_a) {
                            case Model_1.HTTP_METHODS.GET: return [3 /*break*/, 1];
                            case Model_1.HTTP_METHODS.PUT: return [3 /*break*/, 3];
                            case Model_1.HTTP_METHODS.DELETE: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.handleGet()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, this.handlePut()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, this.handleDelete()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        this.handleNotFound();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UsersHandler.prototype.operationAuthorized = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenId, tokenRights;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenId = this.req.headers.authorization;
                        if (!tokenId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tokenValidator.validateToken(tokenId)];
                    case 1:
                        tokenRights = _a.sent();
                        if (tokenRights.accessRights.includes(operation)) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersHandler;
}(BaseRequestHandler_1.BaseRequestHandler));
exports.UsersHandler = UsersHandler;
