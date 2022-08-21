import dedent from "dedent-js";
import { getColor } from "../helpers/colorHelper.js";

const printError = (err) => {
    console.log(getColor("red", `ERROR: ${err}`));
}

const printSuccess = (err) => {
    console.log(getColor("green", `SUCCESS: ${err}`));
}

const printHelp = () => {
    console.log(
        dedent(`${getColor("cyan", 'HELP: ', 30)}
         Без параметров погоды - вывод погоды
         -s [City] для установки города 
         -h для вывода помощи
         -t [API_KEY] для сохранения токена
        `)
    )
}

export const printWeather = (res, icon) => {
    console.log(res)
    console.log(
        dedent(`${getColor("yellow", 'Weather:')}
        Погода в городе ${res.name}:
        ${icon} ${icon} ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp} (Ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветре: ${res.wind.speed}
        `)
    )
}

export {printError, printSuccess, printHelp}