#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
    console.log(getArgs(process.argv));
}

initCLI();