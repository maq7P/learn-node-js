import { promises } from "fs";
import { FILE_PATH_DATA } from "../constants/file.js";

export const saveKeyValue = async (key, value) => {
    let data = {};

    if(await isExsist(FILE_PATH_DATA)){
        const file = await promises.readFile(FILE_PATH_DATA);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(FILE_PATH_DATA, JSON.stringify(data));
}


export const getKeyValue = async (key) => {
    if(await isExsist(FILE_PATH_DATA)){
        const file = await promises.readFile(FILE_PATH_DATA);
        const data = JSON.parse(file);

        return data[key];
    }

    return undefined;
}

const isExsist = async (path) => {
    try{
        await promises.stat(path);
        return true;
    } catch(_){
        return false;
    }
}