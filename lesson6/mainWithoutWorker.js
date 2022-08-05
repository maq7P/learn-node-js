
const factorial = require("./facrotial");

const compute = ({array}) => {
    const arrPow = [];

    for(let i = 0; i < 1000000; i++){
        arrPow.push(i * i);
    }

    return array.map(el => factorial(el));
}


function main(){
    try{
        performance.mark("start");

        const result = [
            compute([25, 20, 19, 48, 30, 50]),
            compute([25, 20, 19, 48, 30, 50]),
            compute([25, 20, 19, 48, 30, 50]),
            compute([25, 20, 19, 48, 30, 50]),
        ];
        console.log(result);
    
        performance.mark("end");
        performance.measure("main", "start", "end");
    
        console.log(performance.getEntriesByName("main").pop());
    } catch(e){
        console.log(e.message);
    }

    setTimeout(() => {
        console.log('Timeout doesnt working...');
    }, 2000)
}   

main();