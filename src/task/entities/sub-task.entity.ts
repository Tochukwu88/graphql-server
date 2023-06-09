import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from '../enums/task.enum';

@ObjectType()
export class SubTaskEntity {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  status: Status;
  @Field({ nullable: true })
  startDate: Date;
}
