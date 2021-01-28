import { SetMetadata } from '@nestjs/common';
import { Car } from 'src/car/car.entity';
import { User } from 'src/user/user.entity';
import { Action, AppAbility } from './casl-ability.factory';

export type PolicyHandler = (ability: AppAbility) => boolean;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

export const canCreateCar = (ability: AppAbility) =>
  ability.can(Action.Create, Car);

export const canUpdateCar = (ability: AppAbility) =>
  ability.can(Action.Update, Car);

export const canDeleteCar = (ability: AppAbility) =>
  ability.can(Action.Delete, Car);

export const canReadUser = (ability: AppAbility) =>
  ability.can(Action.Read, User);
