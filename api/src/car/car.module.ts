import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [CarResolver, CarService],
})
export class CarModule {}
