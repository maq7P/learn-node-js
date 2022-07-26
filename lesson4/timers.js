
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

