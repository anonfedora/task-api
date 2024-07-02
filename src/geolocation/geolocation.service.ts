import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GeolocationService {
    constructor(private configService: ConfigService) {}

    async getLocation(ip: string): Promise<any> {
        /* const url = `https://api.weatherapi.com/v1/ip.json?q=${"105.112.226.93"}&key=${this.configService.get(
            "WEATHER_API"
        )}`;*/
        //105.112.226.93
        const url = `https://apiip.net/api/check?ip=${ip}&accessKey=${this.configService.getOrThrow(
            "GEO_LOCATION_API_KEY"
        )}`;
        const response = await axios.get(url);
        console.log(response.data.city);
        console.log(response.data);
        return response.data;
    }

    async getWeather(city: string): Promise<any> {
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${this.configService.get(
            "OPEN_WEATHER"
        )}&q=${city}`;

        // https://api.openweathermap.org/data/2.5/weather?appid=c7c68e44e355f6934cbe89ec20dcf18f&q=$Katsina&units=metric
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        return response.json();
    }
}
