"use strict";
exports.__esModule = true;
var UserCredentialsDBAccess_1 = require("./Server/Authorization/UserCredentialsDBAccess");
var Model_1 = require("./Shared/Model");
var UsersDBAccess_1 = require("./User/UsersDBAccess");
var DbTest = /** @class */ (function () {
    function DbTest() {
        this.dbAccess = new UserCredentialsDBAccess_1.UserCredentialsDBAccess();
        this.userDbAccess = new UsersDBAccess_1.UsersDBAccess();
    }
    return DbTest;
}());
// new DbTest().dbAccess.putUserCredentials(
//     {
//         username : 'user1', 
//         password: 'pass',
//         accessRights: [AccessRight.CREATE, AccessRight.READ, AccessRight.DELETE, AccessRight.UPDATE] 
//     })
new DbTest().userDbAccess.putUser({
    id: '1',
    name: 'emmett',
    age: 22,
    workingPosition: Model_1.WorkingPosition.ENGINEER,
    email: 'emmettwalsh@gmail.com'
});
