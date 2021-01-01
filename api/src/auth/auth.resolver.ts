import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginCredentials } from './auth.input';
import { AuthLogin } from './auth.model';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';

@Resolver(() => AuthLogin)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthLogin!)
  async login(@Args('credentials') credentials: LoginCredentials) {
    return await this.authService.login(credentials);
  }
}
