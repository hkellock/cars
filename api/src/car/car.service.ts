import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatedUser } from 'src/auth/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarInput } from './car.input';

const createMapWithAddedComparison = (comparisonToAdd: Car) => (car: Car) => ({
  ...car,
  compareTo: [comparisonToAdd, ...(car.compareTo ?? [])],
});

const createMapWithRemovedComparison = (comparisonToRemove: Car) => (
  car: Car,
) => ({
  ...car,
  compareTo: (car.compareTo ?? []).filter(
    (ct) => ct.id !== comparisonToRemove.id,
  ),
});

const createFilterOut = (toBeFiltered: Car[]) => (oc: Car) =>
  !toBeFiltered.find((nc) => nc.id === oc.id);

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly userService: UserService,
  ) {}

  private async findById(id: string): Promise<Car> {
    return await this.carRepository
      .createQueryBuilder('car')
      .where('car.id = :id', { id })
      .leftJoinAndSelect('car.compareTo', 'compareTo')
      .getOne();
  }

  private async findByIds(ids: string[]): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .whereInIds(ids)
      .leftJoinAndSelect('car.compareTo', 'compareTo')
      .getMany();
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.compareTo', 'compareTo')
      .getMany();
  }

  async add(input: CarInput, validatedUser: ValidatedUser): Promise<Car> {
    const user = await this.userService.findOne(validatedUser.username);

    const newComparisons = await this.findByIds(input.compareToIds);
    const newCar = this.carRepository.create({
      ...input,
      user,
      compareTo: newComparisons,
    });
    const savedCar = await this.carRepository.save(newCar);

    const addedComparisons: Car[] = newComparisons.map(
      createMapWithAddedComparison(savedCar),
    );
    await this.carRepository.save(addedComparisons);

    return savedCar;
  }

  async edit(id: string, input: CarInput): Promise<Car> {
    const oldCar = await this.findById(id);
    const oldComparisons = oldCar.compareTo
      ? await this.findByIds(oldCar.compareTo.map((ct) => ct.id))
      : [];

    const newComparisons = await this.findByIds(input.compareToIds);
    const newCar: Car = {
      ...oldCar,
      brand: input.brand,
      model: input.model,
      type: input.type,
      price: input.price,
      yearlyTax: input.yearlyTax,
      wltpConsumption: input.wltpConsumption,
      compareTo: newComparisons,
    };
    const savedCar = await this.carRepository.save(newCar);

    const addedComparisons: Car[] = newComparisons
      .filter(createFilterOut(oldComparisons))
      .map(createMapWithAddedComparison(savedCar));
    await this.carRepository.save(addedComparisons);

    const removedComparisons: Car[] = oldComparisons
      .filter(createFilterOut(newComparisons))
      .map(createMapWithRemovedComparison(savedCar));
    await this.carRepository.save(removedComparisons);

    return savedCar;
  }

  async remove(id: string): Promise<string> {
    await this.carRepository.delete(id);
    return id;
  }
}
