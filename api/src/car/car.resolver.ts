import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './car.model';
import { CarInput } from './car.input';
import { Public } from 'src/auth/jwt-auth.guard';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Public()
  @Query(() => [Car!]!)
  async cars() {
    return await this.carService.findAll();
  }

  @Mutation(() => Car!)
  async createCar(@Args('input') input: CarInput) {
    return await this.carService.create(input);
  }

  @Mutation(() => Car!)
  async editCar(@Args('id') id: string, @Args('input') input: CarInput) {
    return await this.carService.edit(id, input);
  }

  @Mutation(() => String!)
  async removeCar(@Args('id') id: string) {
    return await this.carService.remove(id);
  }
}
