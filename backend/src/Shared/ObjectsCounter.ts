export class Monitor{
    public static printInstances(){
        let response = ''
        Counter.countsMap.forEach((value:number, key: string ) =>{
            response+= `${key} : ${value} \n`
        })

        return response
    }


    
}


class Counter{

    static countsMap : Map<string,number> = new Map()

    static increment(classname: string){
        if(!this.countsMap.get(classname)){
            this.countsMap.set(classname, 1)
        }else{
            const count = this.countsMap.get(classname)
            this.countsMap.set(classname, count! +1)
        }
    }
}

export function countInstances<T extends {new (...args:any[]):{}}>(constructor: T){
        return class extends constructor{
            //called every time we get a new object
            abc = Counter.increment(constructor.name) 
        }
        
}