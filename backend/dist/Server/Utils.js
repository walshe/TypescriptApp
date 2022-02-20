"use strict";
exports.__esModule = true;
exports.Utils = void 0;
var url_1 = require("url");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getUrlBasePath = function (url) {
        if (url) {
            var parsedUrl = (0, url_1.parse)(url);
            return parsedUrl.pathname.split("/")[1];
        }
        else {
            return "";
        }
    };
    Utils.getUrlParameters = function (url) {
        if (url) {
            return (0, url_1.parse)(url, true);
        }
        else {
            return undefined;
        }
    };
    return Utils;
}());
exports.Utils = Utils;
