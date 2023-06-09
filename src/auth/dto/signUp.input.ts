import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Field()
  password: string;
}
