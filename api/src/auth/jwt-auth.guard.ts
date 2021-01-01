import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import type { ValidatedUser } from './jwt.strategy';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export type ValidatedRequest = {
  user: ValidatedUser;
};

export const getGqlRequest = (
  context: ExecutionContext | GqlExecutionContext,
): ValidatedRequest => GqlExecutionContext.create(context).getContext().req;

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    return getGqlRequest(context);
  }
}

export const jwtAuthGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
