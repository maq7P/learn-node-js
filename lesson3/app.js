const EventEmiter = require('events');

const dbEmiter = new EventEmiter();

const logDBConnection = () => {
    console.log('DB connected');
}

dbEmiter.addListener('connected', logDBConnection);
dbEmiter.emit('connected');
//dbEmiter.on('connected');

dbEmiter.removeListener('connected', logDBConnection);
// dbEmiter.off('connected', logDBConnection);
// dbEmiter.removeAllListeners('connected');

dbEmiter.on('msg', (data) => {
    console.log(`Recived ${data}`)
});
dbEmiter.emit('msg', 'Сообщение');

dbEmiter.once('off', () => {
    console.log('Вызывается один раз')
});


// Показывает максимальное число листенеров
// dbEmiter.getMaxListeners()

// Устанаваливает максимальное число листенеров
// dbEmiter.setMaxListeners(n)

// Показывает число на конкретном листенре
// dbEmiter.listenerCount('event')

// Выводит массив листенеров
// dbEmiter.listeners('event')

// Тоже самое, что on , только добавляет в начало обработчиков
// dbEmiter.prependListener('event')

// Массив событий
// dbEmiter.eventsName()


// Обработка ошибки
dbEmiter.on('error', (err) => {
    console.log(`Handled error ${err.message}`)
})

dbEmiter.emit('error', new Error('Boom'))





