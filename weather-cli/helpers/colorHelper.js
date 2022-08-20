import chalk from "chalk";

export const getEmptySpace = (count) => {
    let res = "";

    while(count > 0){
        res += " ";
        count--;
    }

    return res;
}

export const getColor = (color, log, emptyCount = 0) => {
    const { bgRed, bgCyan, bgGreen, bgBlack, bgBlue, bgYellowBright } = chalk;
    const res = log + getEmptySpace(emptyCount);

    switch(color){
        case "cyan": 
            return bgCyan(res);
        case "red": 
            return bgRed(res);
        case "green": 
            return bgGreen(res);
        case "black": 
            return bgBlack(res);
        case "blue": 
            return bgBlue(res);
        case "yellow":
            return bgYellowBright(res)
        default: res;
    }
}