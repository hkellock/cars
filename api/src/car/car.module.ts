import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { Car } from './car.entity';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User]), UserModule],
  providers: [CarResolver, CarService],
})
export class CarModule {}
