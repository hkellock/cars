import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
