import { InputType, Int, Field } from '@nestjs/graphql';
import { Status } from '../enums/task.enum';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

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
export class CreateSubTaskInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field(() => Int)
  taskId: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: Status;

  @Field({ nullable: true })
  startDate?: Date;
}
