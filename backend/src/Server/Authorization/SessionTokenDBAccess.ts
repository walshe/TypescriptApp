
import { UserCredentials } from "../../Shared/Model";

import * as Nedb from 'nedb'
import { SessionToken } from "../Model";

import {logInvocation} from '../../Shared/MethodDecorators'

export class SessionTokenDBAccess {

    private nedb : Nedb 

    constructor(){
        this.nedb =new Nedb('database/SessionToken.db')
        this.nedb.loadDatabase()
    }

    @logInvocation
    public async storeSessionToken(sessionToken: SessionToken) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this.nedb.insert(sessionToken, (err: any, docs: any) =>{
                if(err){
                    reject(err)
                }
                resolve(docs)
            })
        })
    }

    @logInvocation
    public async getToken(tokenId: string) : Promise<SessionToken | undefined> {
        return new Promise((resolve, reject) =>{
            this.nedb.find({ tokenId : tokenId }, (err: any, docs: SessionToken[]) =>{
                if(err){
                    reject(err)
                }else{
                    if(docs.length == 0 ){
                        resolve(undefined)
                    }else{
                        resolve(docs[0])
                    }
                }
                
            })
        })
    }
}