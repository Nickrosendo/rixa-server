import { User, PrizeItem } from 'src/helpers/interfaces';
import { Rank } from 'src/helpers/enums';

export interface Challenge {
	id: string;
	creator: User;
	creationDate: Date;
	rank: Rank;
	totalPrize: number;
	participants: Array<User>;
	prizeItems: Array<PrizeItem>;
	title: string;
}
