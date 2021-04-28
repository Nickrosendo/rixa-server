import { Field, ID, Float, ObjectType, Int } from '@nestjs/graphql';

import { User } from '@root/user/models/user.model';
import { Prize } from '@root/prize/models/prize.model';
import { Rank } from '@root/helpers/enums';

@ObjectType()
export class Challenge {
	@Field((type) => ID)
	id: string;

	@Field((type) => User)
	creator: User;

	@Field((type) => Date)
	creationDate: Date;

	@Field((type) => Int)
	rank: Rank;

	@Field((type) => Float)
	totalPrize: number;

	@Field((type) => [User])
	participants: User[];

	@Field((type) => [Prize])
	prizeItems: Prize[];

	@Field({ nullable: true })
	title: string;
}
