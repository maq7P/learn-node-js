import axios from "axios";

import { WEATHER_URL } from "../constants/API.js";
import { TOKEN_DICTIONARY } from "../constants/token.js";

import { getKeyValue } from "./storage.service.js";

export const getWeather = async (city) => {
    const token = 
        process.env.API_TOKEN || await getKeyValue(TOKEN_DICTIONARY.token);

    if(!token) throw Error("Not setted token");

    const { data } = await axios.get(WEATHER_URL, {
        params: {
            appid: token,
            q: city,
            lang: "ru",
            units: "metrics"
        }
    });

    return data
}

export const getIcon = (icon) => {
    switch(icon.slice(0, -1)){
        case "01":
            return "🌞"
        case "02":
            return "🌤"
        case "03":
            return "⛅"
        case "04":
            return "⛅"
        case "09":
            return "🌧️"
        case "10":
            return "🌦"
        case "13":
            return "❄️"
    }
}