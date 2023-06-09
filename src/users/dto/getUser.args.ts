import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;
}
