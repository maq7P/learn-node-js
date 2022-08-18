#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printError, printSuccess } from "./service/log.service.js";
import { saveKeyValue } from "./service/storage.service.js";

const saveKey = async (token) => {
    if(!token.length){
        return printError("Token not transferred");
    }
    try {
        await saveKeyValue("token", token);
        printSuccess("Token saved");
    } catch(e){
        printError(e.message);
    }
}
const initCLI = () => {
    const args = getArgs(process.argv);

    args.h && printHelp()
    args.t && saveKey(args.t)
}

initCLI();