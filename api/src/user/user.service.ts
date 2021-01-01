import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(username: string) {
    const user = this.userRepository.create({ username });
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ username });
  }
}
