import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginCredentials {
  @Field()
  username: string;

  @Field()
  idToken: string;
}
