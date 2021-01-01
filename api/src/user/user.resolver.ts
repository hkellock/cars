import { Resolver, Query } from '@nestjs/graphql';
import type { ValidatedUser } from 'src/auth/jwt.strategy';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User!)
  async profile(@CurrentUser() user: ValidatedUser) {
    return await this.userService.findOne(user.username);
  }
}
