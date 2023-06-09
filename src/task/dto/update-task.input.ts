import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../enums/task.enum';

@InputType()
export class UpdateTaskInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  status?: Status;

  @Field({ nullable: true })
  startDate?: Date;
}

@InputType()
export class UpdateSubTaskInput extends PartialType(UpdateTaskInput) {}
