
import * as Nedb from 'nedb'
import { User } from '../Shared/Model';

export class UsersDBAccess{
    private nedb : Nedb 

    constructor (){
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase()   
    }

    public async putUser(user : User): Promise<void>{
        return new Promise((resolve,reject) => {
            this.nedb.insert(user, (error )=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
            
        })
    } 

    public async getUserById(userId: string): Promise<User | undefined>{
        return new Promise((resolve,reject) => {
            this.nedb.find({_id: userId}, (error: any, docs: any )=>{
                if(error){
                    reject(error)
                }else{
                    if(docs.length == 0){
                        resolve(undefined)
                    }else{
                        resolve(docs[0])
                    }
                    
                }
            })
            
        })
    }

    public async deleteUserById(userId: string): Promise<boolean>{
        return new Promise((resolve,reject) => {
            this.nedb.remove({_id: userId}, (error: any, numRemoved: number )=>{
                if(error){
                    reject(error)
                }else{
                    if(numRemoved > 0){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                    
                    
                }
            })
            
        })
    }

    public async getUserByName(name: string): Promise<User[]>{
        const regex = new RegExp(name)
        return new Promise((resolve,reject) => {
            this.nedb.find({name: regex}, (error: any, docs: any )=>{
                if(error){
                    reject(error)
                }else{
                    resolve(docs)
                    
                }
            })
            
        })
    }
}