
const start = performance.now()

setTimeout(() => {
    // ~1002-1005
    // Таймеры не гарантия выполнения (влитяет от загруженности eventLoop)
    console.log(performance.now() - start)
    console.log("anything")
}, 1000)


console.log('Перед')


/////////////////////////////////////////////////////////////////////

setImmediate(() => {
    console.log('После всего потом setImmidiate')
})

queueMicrotask(() => {
    console.log('После всего сначала queuMicrotask')
})


console.log('После')

////////////////////////////////////////////////////////////////////////

const timerId = setTimeout(() => {
    console.log('boom')
}, 5000)
timerId.unref();

setImmediate(() => {
    //Снова вернется и выполнится через установленное таймеров время
    timerId.ref();
})



////////////////////////////////////////////////////////////////////////
const fs = require("fs");

console.log("INIT")

setTimeout(() => {
    console.log(performance.now(), "Timer 100")
}, 100);

setImmediate(() => {
    console.log("Immediate")
})

//регистрируется в фазе poll и ждет прочтения
fs.readFile(__filename, () => {
    console.log("file readed")
});

//Заррегистрируетя в фазе таймеров, и сразу же приступит к к выполнению, так как 0
//После выполения между фаз зарегистриуется Microtask промиса
setTimeout(() => {
   for (let i = 0; i < 1000000000; i++){}
   console.log("done heavy");

    Promise.resolve().then(() => {
        console.log("Promise")
    })

}, 0);

// Microtask происходять между каждой из фаз,
Promise.resolve().then(() => {
    console.log("Promise")
})

//Тики выполняются в приоритете, только потом Microtask
process.nextTick(() => {
    console.log("tick")
})

console.log("FINISH")