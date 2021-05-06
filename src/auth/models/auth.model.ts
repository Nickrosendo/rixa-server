import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
	@Field()
	name: string;

	@Field()
	password: string;
}
