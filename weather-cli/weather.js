#!/ust/bin/env node
import { TOKEN_DICTIONARY } from "./constants/token.js";
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./service/api.service.js";
import { printHelp, printError, printSuccess } from "./service/log.service.js";
import { saveKeyValue } from "./service/storage.service.js";

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
const initCLI = () => {
    const args = getArgs(process.argv);

    args.h && printHelp();
    args.t && saveKey(args.t);

    getWeather()
}

initCLI();