import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GeolocationService {
    constructor(private configService: ConfigService) {}

    async getLocation(ip: string): Promise<any> {
        const url = `https://api.weatherapi.com/v1/ip.json?q=${ip}&key=${this.configService.get(
            "WEATHER_API"
        )}`;
        //105.112.226.93
        /*const url = `https://apiip.net/api/check?ip=${ip}&accessKey=${this.configService.getOrThrow(
            "GEO_LOCATION_API_KEY"
        )}`;*/
        const response = await axios.get(url);
        console.log(response);
        return response;
    }

    async getWeather(city: string): Promise<any> {
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${this.configService.get(
            "OPEN_WEATHER"
        )}&q=${city}`;

        const response = await fetch(url);
        console.log(response);
        return response;
    }
}
