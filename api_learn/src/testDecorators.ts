function Conponent(id: number){
    return (tagret: Function) => {
        tagret.prototype.id = id;
    }
}

function Logger(){
    console.log("init logger");
    
    return (tagret: Function) => {
        console.log('run logger');
    }
}

function Method(
    target: Object, 
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
){
    console.log(propertyKey);
    const oldValue =  propertyDescriptor.value;
    propertyDescriptor.value = (...args: any[]) => {
        oldValue();
        console.log(args[0] * 10);
    }
    
}

function Prop(target: Object, propertyKey: string){
    let val: number;

    const getter = () => {
        console.log("get");
        
        return val
    }

    const setter = (newVal: number) => {
        console.log("set");

        val = newVal 
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    })
}

function Param(target: Object, propertyKey: string, index: number){
    console.log(propertyKey);
    console.log(index);
}

@Logger()
@Conponent(1)
class User {
    @Prop id: number;

    @Method
    setId(@Param newId: number){
        this.id = newId;
        return newId;
    }
}