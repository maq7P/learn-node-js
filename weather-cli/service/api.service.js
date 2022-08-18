import axios from "axios";
import { TOKEN_DICTIONARY } from "../constants/token.js";
import { getKeyValue } from "./storage.service.js";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";


export const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token) throw Error("Not setted token");

    const { data } = await axios.get(WEATHER_URL, {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metrics"
        }
    });

    return data
}