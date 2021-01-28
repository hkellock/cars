import { CanActivate } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getGqlRequest, IS_PUBLIC_KEY } from '../auth/jwt-auth.guard';
import { Car } from '../car/car.entity';
import { Action, AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './casl.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = getGqlRequest(context);
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => handler(ability));
  }
}

export const canCreateCar = (ability: AppAbility) =>
  ability.can(Action.Create, Car);

export const canUpdateCar = (ability: AppAbility) =>
  ability.can(Action.Update, Car);

export const canDeleteCar = (ability: AppAbility) =>
  ability.can(Action.Delete, Car);
