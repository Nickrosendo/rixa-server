import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field(type => ID, { nullable: true })
	id: string;

	@Field()
	name: string;

	@Field()
	nickname: string;

	@Field()
	email: string;

	@Field((type) => Date)
	creation: Date;

	@Field({ nullable: true })
	avatarUrl?: string;
}
