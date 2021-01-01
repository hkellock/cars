import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntityWithoutRelations, UserService } from 'src/user/user.service';
import { LoginCredentials } from './auth.input';
import { AuthLogin } from './auth.model';

export type AccessTokenPayload = {
  username: string;
  sub: string;
};

type UserWithoutRelations = Pick<UserEntityWithoutRelations, 'username'>;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(
    credentials: LoginCredentials,
  ): Promise<UserWithoutRelations | null> {
    // TODO: Validate idToken with external service
    // TODO: Check that email in idToken is the same as the username
    const user =
      (await this.userService.findOne(credentials.username)) ??
      (await this.userService.create(credentials.username));

    return user ? { username: user.username } : null;
  }

  async login(credentials: LoginCredentials): Promise<AuthLogin> {
    const user = await this.validateUser(credentials);
    if (!user) throw new UnauthorizedException();
    const payload: AccessTokenPayload = {
      sub: user.username, // TODO: Should this be the userId?
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
