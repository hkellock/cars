import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { CarInput } from './car.input';
import { Public } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { ValidatedUser } from '../auth/jwt.strategy';
import { CheckPolicies } from '../casl/casl.decorator';
import {
  canUpdateCar,
  canDeleteCar,
  PoliciesGuard,
  canCreateCar,
} from '../casl/casl-policies.guard';
import { CarAuthorizer } from './car.authorizer';

@UseGuards(PoliciesGuard)
@Resolver(() => Car)
export class CarResolver {
  constructor(
    private readonly carService: CarService,
    private readonly carAuthorizer: CarAuthorizer,
  ) {}

  @Public()
  @Query(() => [Car!]!)
  async cars() {
    return await this.carService.findAll();
  }

  @CheckPolicies(canCreateCar)
  @Mutation(() => Car!)
  async createCar(
    @Args('input') input: CarInput,
    @CurrentUser() user: ValidatedUser,
  ) {
    return await this.carService.add(input, user);
  }

  @CheckPolicies(canUpdateCar)
  @Mutation(() => Car!)
  async editCar(
    @Args('id') id: string,
    @Args('input') input: CarInput,
    @CurrentUser() user: ValidatedUser,
  ) {
    const car = await this.carAuthorizer.get(id, user);
    return await this.carService.edit(car, input);
  }

  @CheckPolicies(canDeleteCar)
  @Mutation(() => String!)
  async removeCar(@Args('id') id: string) {
    return await this.carService.remove(id);
  }
}
