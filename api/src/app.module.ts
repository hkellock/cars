import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from '../ormconfig';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { jwtAuthGuardProvider } from './auth/jwt-auth.guard';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CarModule,
    UserModule,
    AuthModule,
    CaslModule,
  ],
  providers: [jwtAuthGuardProvider],
})
export class AppModule {}
