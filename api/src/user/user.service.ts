import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export type UserWithoutRelations = Omit<User, 'cars'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(username: string): Promise<UserWithoutRelations> {
    const user = this.userRepository.create({ username });
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<UserWithoutRelations | undefined> {
    return await this.userRepository.findOne({ username });
  }

  async findOneWithCars(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne(
      { username },
      { relations: ['cars'] },
    );
  }
}
