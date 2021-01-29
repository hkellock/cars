import {
  Provider,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ValidatedUser } from '../auth/jwt.strategy';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './casl.decorator';
import { IS_PUBLIC_KEY } from './public.decorator';

export type ValidatedRequest = {
  user: ValidatedUser;
};

export const getGqlRequest = (
  context: ExecutionContext | GqlExecutionContext,
): ValidatedRequest => GqlExecutionContext.create(context).getContext().req;

@Injectable()
export class PoliciesGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    if (!(await super.canActivate(context))) {
      return false;
    }

    const policyHandlers = this.reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );
    if (!policyHandlers) {
      throw new InternalServerErrorException(
        'Policy handler must be defined for non-public routes.',
      );
    }

    const { user } = getGqlRequest(context);
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => handler(ability));
  }

  getRequest(context: ExecutionContext) {
    return getGqlRequest(context);
  }
}

export const policiesGuardProvider: Provider<PoliciesGuard> = {
  provide: APP_GUARD,
  useClass: PoliciesGuard,
};
