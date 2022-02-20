import { User } from "../model/DataModels"


const baseUrl : string = "http://localhost:8080"
const usersUrl : string = `${baseUrl}/users`


export class DataService{

    public async getUsers(authentication:string, nameQuery: string): Promise<User[]>{
        const url = `${usersUrl}?name=${nameQuery}`

        let options = {
            method:  'GET' ,
            headers : {
                Authorization : authentication
            }
        }

        const result = await fetch(url, options)

        return await result.json()
        
    }

    public async deleteUser(authentication:string, id : string): Promise<void>{
        const url = `${usersUrl}?id=${id}`

        let options = {
            method:  'DELETE' ,
            headers : {
                Authorization : authentication
            }
        }

        const result = await fetch(url, options)

        if(result.status == 200){
            return await result.json()
        }else{
            return undefined
        }
    }

}