import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

export type AccessTokenPayload = {
  username: string;
  sub: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);
    if (user) {
      return { username: user.username };
    }
    return null;
  }

  async login(user: User) {
    const payload: AccessTokenPayload = {
      username: user.username,
      sub: user.username, // TODO: Should this be the userId?
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
