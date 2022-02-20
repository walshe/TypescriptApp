"use strict";
exports.__esModule = true;
exports.WorkingPosition = exports.HTTP_METHODS = exports.HTTP_CODES = exports.AccessRight = void 0;
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight = exports.AccessRight || (exports.AccessRight = {}));
var HTTP_CODES;
(function (HTTP_CODES) {
    HTTP_CODES[HTTP_CODES["OK"] = 200] = "OK";
    HTTP_CODES[HTTP_CODES["CREATED"] = 201] = "CREATED";
    HTTP_CODES[HTTP_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODES[HTTP_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_CODES[HTTP_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HTTP_CODES = exports.HTTP_CODES || (exports.HTTP_CODES = {}));
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["GET"] = "GET";
    HTTP_METHODS["PUT"] = "PUT";
    HTTP_METHODS["POST"] = "POST";
    HTTP_METHODS["DELETE"] = "DELETE";
    HTTP_METHODS["OPTIONS"] = "OPTIONS";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
var WorkingPosition;
(function (WorkingPosition) {
    WorkingPosition[WorkingPosition["JUNIOR"] = 0] = "JUNIOR";
    WorkingPosition[WorkingPosition["PROGRAMMER"] = 1] = "PROGRAMMER";
    WorkingPosition[WorkingPosition["ENGINEER"] = 2] = "ENGINEER";
    WorkingPosition[WorkingPosition["EXPERT"] = 3] = "EXPERT";
    WorkingPosition[WorkingPosition["MANAGER"] = 4] = "MANAGER";
})(WorkingPosition = exports.WorkingPosition || (exports.WorkingPosition = {}));
