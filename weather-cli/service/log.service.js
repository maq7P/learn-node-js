import dedent from "dedent-js";
import { getColor } from "../helpers/colorHelper.js";

const printError = (err) => {
    console.log(getColor("red, "`ERROR: ${err}`));
}

const printSuccess = (err) => {
    console.log(getColor("green, "`ERROR: ${err}`));
}

const printHelp = () => {
    console.log(
        dedent(`${getColor("cyan", 'HELP: ', 30)}
         Без параметров погоды - вывод погоды
         -s [City] для установки города 
         -h для вывода помощи
         -t [API_KEY] для сохранения токена
         ${getColor("cyan", '', 36)}
        `)
    )
}

export {printError, printSuccess, printHelp}