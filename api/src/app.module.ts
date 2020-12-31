import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { jwtAuthGuardProvider } from './auth/jwt-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CarModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, jwtAuthGuardProvider],
})
export class AppModule {}
