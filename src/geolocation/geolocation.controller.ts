import { Controller, Get, Query, Req } from "@nestjs/common";
import { GeolocationService } from "./geolocation.service";
import { Request } from "express";

@Controller("api")
export class GeolocationController {
    constructor(private readonly geolocationService: GeolocationService) {}

    @Get()
    async getHello(
        @Query("visitor_name") visitorName: string,
        @Req() request: Request
    ): Promise<any> {
        const clientIp =
            request.headers["x-forwarded-for"] ||
            request.connection.remoteAddress;
        console.log(request.ip);
        const locationData = await this.geolocationService.getLocation(
            clientIp as string
        );
        const city = locationData.city;
        const weatherData = await this.geolocationService.getWeather(city);
        const temperature = weatherData;
        console.log(temperature);

        return {
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        };
    }
}
