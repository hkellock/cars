import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../casl/casl.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { CarAuthorizer } from './car.authorizer';
import { Car } from './car.entity';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User]), UserModule, CaslModule],
  providers: [CarResolver, CarService, CarAuthorizer],
})
export class CarModule {}
