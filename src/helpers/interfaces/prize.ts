import { User } from '@root/helpers/interfaces';

export interface PrizeItem {
	id: string;
	value: number;
	creator: User;
	creationDate: Date;
	challengeId: string;
}
