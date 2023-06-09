import { InputType, Int, Field } from '@nestjs/graphql';
import { Status } from '../enums/task.enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindOneTaskInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}

@InputType()
export class FindAllTaskInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  page?: number;
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: Status;

  @Field({ nullable: true })
  startDate?: Date;
}
