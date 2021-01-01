import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatedUser } from 'src/auth/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarInput } from './car.input';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async add(input: CarInput, validatedUser: ValidatedUser): Promise<Car> {
    const user = await this.userService.findOne(validatedUser.username);
    const car = this.carRepository.create({ ...input, user });
    return await this.carRepository.save(car);
  }

  async edit(input: Car): Promise<Car> {
    const car = this.carRepository.create(input);
    return await this.carRepository.save(car);
  }

  async remove(id: string): Promise<string> {
    await this.carRepository.delete(id);
    return id;
  }
}
