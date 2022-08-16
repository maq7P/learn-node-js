#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./service/log.service.js";
import { saveKeyValue } from "./service/storage.service.js";

const initCLI = () => {
    const args = getArgs(process.argv);

    args.h && printHelp()
    args.t && saveKeyValue("token", args.t)
}

initCLI();