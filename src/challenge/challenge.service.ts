import { Injectable } from '@nestjs/common';

import { Challenge, PrizeItem, User } from '@root/helpers/interfaces';
import { Rank } from '@root/helpers/enums';

const mockUser: User = {
	id: '2',
	nickname: 'nickrosendo',
	name: 'Nicolas Rosendo',
	email: 'nicolas.test@rixa.com',
	creation: new Date('2020-11-10'),
	avatarUrl:
		'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4404.jpg?image=q_auto:best&v=1518361200',
};

const mockUser2: User = {
	id: '1',
	nickname: 'testrosendo',
	name: 'Rosendo Nicolas',
	email: 'rosendo.nicolas@rixa.com',
	creation: new Date('2020-10-10'),
	avatarUrl:
		'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4404.jpg?image=q_auto:best&v=1518361200',
};

const mockPrizeItem: PrizeItem = {
	id: '3',
	value: 500,
	creator: mockUser,
	creationDate: new Date('2021-12-30'),
	challengeId: '1',
};

const mockPrizeItem2: PrizeItem = {
	id: '4',
	value: 1000,
	creator: mockUser,
	creationDate: new Date('2021-12-30'),
	challengeId: '2',
};

const mockChallenges: Challenge[] = [
	{
		id: '1',
		creator: mockUser,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Gold,
		totalPrize: 500,
		participants: [mockUser],
		prizeItems: [mockPrizeItem],
		title: 'My first challenge',
	},
	{
		id: '2',
		creator: mockUser,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Gold,
		totalPrize: 1000,
		participants: [mockUser],
		prizeItems: [mockPrizeItem2],
		title: 'My second challenge',
	},
	{
		id: '3',
		creator: mockUser2,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Gold,
		totalPrize: 1000,
		participants: [mockUser],
		prizeItems: [mockPrizeItem2],
		title: 'My third challenge',
	},
	{
		id: '4',
		creator: mockUser2,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Platinum,
		totalPrize: 5,
		participants: [mockUser],
		prizeItems: [mockPrizeItem2],
		title: 'My fourth challenge',
	},
];

@Injectable()
export class ChallengeService {
	async getChallenges() {
		return mockChallenges;
	}

	async getChallengesById(creatorId: string): Promise<Challenge[]> {
		return mockChallenges.filter(
			(challenge: Challenge) => challenge.creator.id === creatorId,
		);
	}

	async getChallenge(id: string) {
		return mockChallenges.find((challenge: Challenge) => challenge.id === id);
	}
}
