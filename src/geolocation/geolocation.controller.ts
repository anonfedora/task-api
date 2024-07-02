import { Controller, Get, Query, Req } from "@nestjs/common";
import { GeolocationService } from "./geolocation.service";
import { Request } from "express";
import IP from "ip";

@Controller("api/hello")
export class GeolocationController {
    constructor(private readonly geolocationService: GeolocationService) {}

    @Get()
    async getHello(
        @Query("visitor_name") visitorName: string,
        @Req() request: Request
    ): Promise<any> {
        const clientIp =
            request.ip
            /*request.headers["x-forwarded-for"] ||
            request.connection.remoteAddress;*/
        const locationData = await this.geolocationService.getLocation(
            clientIp as string
        );
        console.log(locationData);
        const city = locationData.city;
        const weatherData = await this.geolocationService.getWeather(city);
        const temperature = weatherData;
        //console.log(temperature);

        return {
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        };
    }
}
