#!/ust/bin/env node
import { TOKEN_DICTIONARY } from "./constants/token.js";
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./service/api.service.js";
import { printHelp, printError, printSuccess, printWeather } from "./service/log.service.js";
import { getKeyValue, saveKeyValue } from "./service/storage.service.js";

const saveKey = async (token) => {
    if(!token.length){
        return printError("Token not transferred");
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved");
    } catch(e){
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if(!city.length){
        return printError("City is not specify");
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved");
    } catch(e){
        printError(e.message);
    }
}

const getForcast = async () => {
    try{
        const city = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city);

        printWeather(weather, weather.weather[0].icon);
    } catch(e){
        const status = e?.response?.status;

        if(status === 404 || status === 401){
            status && printError("Wrong city");
            status && printError("Wrong token");
        } else {
            printError(e.message);
        }
    }
}
const initCLI = async () => {
    const args = getArgs(process.argv);

    if(args.h){
        return printHelp();
    }
    if(args.t){
        return saveKey(args.t);
    }
    if(args.s){
        return saveKey(args.s);
    }

    await getForcast();
}

initCLI();