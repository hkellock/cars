import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthLogin {
  @Field()
  access_token: string;
}
