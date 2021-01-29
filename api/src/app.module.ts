import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from '../ormconfig';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';
import { policiesGuardProvider } from './casl/casl-policies.guard';

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
  providers: [policiesGuardProvider],
})
export class AppModule {}
