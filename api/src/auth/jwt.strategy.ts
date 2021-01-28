import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constants';
import { AccessTokenPayload } from './auth.service';

export type ValidatedUser = {
  userId: string;
  username: string;
  isAdmin: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<ValidatedUser> {
    return {
      userId: payload.sub, // TODO
      username: payload.username,
      isAdmin: false,
    };
  }
}
