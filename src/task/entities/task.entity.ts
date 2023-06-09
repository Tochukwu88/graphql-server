import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from '../enums/task.enum';
import { SubTaskEntity } from './sub-task.entity';

@ObjectType()
export class TaskEntity {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  status: Status;
  @Field({ nullable: true })
  completed: boolean;

  @Field(() => [SubTaskEntity], { nullable: true })
  subTasks: SubTaskEntity[];
}
