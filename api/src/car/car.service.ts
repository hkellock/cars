import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarInput } from './car.input';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async create(input: CarInput): Promise<Car> {
    const car = this.carRepository.create(input);
    return await this.carRepository.save(car);
  }

  async edit(id: string, input: CarInput): Promise<Car> {
    const car = this.carRepository.create({ ...input, id });
    return await this.carRepository.save(car);
  }

  async remove(id: string): Promise<string> {
    await this.carRepository.delete(id);
    return id;
  }
}
