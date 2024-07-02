import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeolocationModule } from './geolocation/geolocation.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env.localhost", ".env"]
        }),GeolocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
