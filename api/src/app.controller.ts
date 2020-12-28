import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    Logger.log('Starting to get hello...', 'getHello');
    return this.appService.getHello();
  }
}
