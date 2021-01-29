import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/casl/public.decorator';
import { LoginCredentials } from './auth.input';
import { AuthLogin } from './auth.model';
import { AuthService } from './auth.service';

@Resolver(() => AuthLogin)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthLogin!)
  async login(@Args('credentials') credentials: LoginCredentials) {
    return await this.authService.login(credentials);
  }
}
