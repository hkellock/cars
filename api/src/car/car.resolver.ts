import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { CarInput } from './car.input';
import { CurrentUser } from '../user/current-user.decorator';
import { ValidatedUser } from '../auth/jwt.strategy';
import { CheckPolicies } from '../casl/casl.decorator';
import {
  canUpdateCar,
  canDeleteCar,
  canCreateCar,
} from '../casl/casl.decorator';
import { CarAuthorizer } from './car.authorizer';
import { Public } from '../casl/public.decorator';

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
