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
        const clientIp = this.getClientIp(request);

        console.log(clientIp);
        const locationData = await this.geolocationService.getLocation(
            clientIp as string
        );
        console.log(locationData + "locationData.city");
        const city = locationData.city;

        const weatherData = await this.geolocationService.getWeather(city);
        console.log(weatherData);
        const temperature = weatherData.main.temp;
        console.log(temperature + "weatherData.current");

        return {
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        };
    }

    private getClientIp(request: Request): string {
        const xForwardedFor = request.headers["x-forwarded-for"];
        if (xForwardedFor) {
            const forwardedIps = (xForwardedFor as string).split(",");
            return forwardedIps[0].trim();
        }
        return request.ip || request.connection.remoteAddress;
    }
}
