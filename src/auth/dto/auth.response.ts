import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.models';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
