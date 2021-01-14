import { Field, ID, Float, ObjectType } from '@nestjs/graphql';

import { User } from '@root/user/models/user.model';

@ObjectType()
export class Prize {
	@Field((type) => ID)
	id: string;

	@Field((type) => Float)
	value: number;

	@Field((type) => User)
	creator: User;

	@Field((type) => Date)
	creationDate: Date;

	@Field((type) => ID)
	challengeId: string;
}
