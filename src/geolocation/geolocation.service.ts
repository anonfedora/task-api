import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GeolocationService {
    constructor(private configService: ConfigService) {}

    async getLocation(ip: string): Promise<any> {
        const url = `https://apiip.net/api/check?ip=${ip}&accessKey=${this.configService.getOrThrow(
            "GEO_LOCATION_API_KEY"
        )}`;
        const response = await fetch(url);
        console.log(response);
        return response;
    }

    async getWeather(city: string): Promise<any> {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.configService.getOrThrow(
                "OPEN_WEATHER"
            )}`
        );
        console.log(response);
        return response;
    }
}
