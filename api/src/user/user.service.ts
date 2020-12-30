import { Injectable } from '@nestjs/common';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = [
    { id: 1, username: 'beta', cars: [] },
  ];

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
