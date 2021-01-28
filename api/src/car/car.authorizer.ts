import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CarService } from './car.service';
import { ValidatedUser } from '../auth/jwt.strategy';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class CarAuthorizer {
  constructor(
    private readonly carService: CarService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async get(id: string, user: ValidatedUser) {
    const car = await this.carService.findById(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, car)) {
      throw new UnauthorizedException();
    }
    return car;
  }
}
