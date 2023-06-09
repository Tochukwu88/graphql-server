import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskResponse {
  @Field()
  message: string;
}
