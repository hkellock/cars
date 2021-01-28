import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getGqlRequest } from '../auth/jwt-auth.guard';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: GqlExecutionContext) => getGqlRequest(context).user,
);
