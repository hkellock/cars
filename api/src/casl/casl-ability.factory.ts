import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ValidatedUser } from '../auth/jwt.strategy';
import { Car } from '../car/car.entity';
import { User } from '../user/user.entity';

export enum Action {
  Manage = 'manage', // CASL for 'any'
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = typeof Car | typeof User | Car | User | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: ValidatedUser) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      const matchCarToUser: MongoQuery = {
        'user.username': user.username,
      };
      can(Action.Create, Car);
      can(Action.Read, Car);
      can(Action.Update, Car, matchCarToUser);
      can(Action.Delete, Car, matchCarToUser);

      const matchUser: MongoQuery<User> = { username: user.username };
      can(Action.Create, User);
      can(Action.Read, User, matchUser);
      can(Action.Update, User, matchUser);
      cannot(Action.Delete, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
