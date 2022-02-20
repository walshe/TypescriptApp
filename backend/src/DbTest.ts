import {UserCredentialsDBAccess} from './Server/Authorization/UserCredentialsDBAccess'
import { AccessRight, WorkingPosition } from './Shared/Model'
import { UsersDBAccess } from './User/UsersDBAccess'
class DbTest {
    public dbAccess:  UserCredentialsDBAccess = new UserCredentialsDBAccess() 
    public userDbAccess: UsersDBAccess = new UsersDBAccess()
}

// new DbTest().dbAccess.putUserCredentials(
//     {
//         username : 'user1', 
//         password: 'pass',
//         accessRights: [AccessRight.CREATE, AccessRight.READ, AccessRight.DELETE, AccessRight.UPDATE] 
//     })


new DbTest().userDbAccess.putUser(
    {
        id: '1',
        name: 'emmett',
        age: 22,
        workingPosition: WorkingPosition.ENGINEER,
        email: 'emmettwalsh@gmail.com',
    
    })

    
