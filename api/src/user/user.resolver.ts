import { Resolver, Query } from '@nestjs/graphql';
import { canReadUser, CheckPolicies } from 'src/casl/casl.decorator';
import type { ValidatedUser } from '../auth/jwt.strategy';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @CheckPolicies(canReadUser)
  @Query(() => User!)
  async profile(@CurrentUser() user: ValidatedUser) {
    return await this.userService.findOneWithCars(user.username);
  }
}
