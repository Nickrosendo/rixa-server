import { Injectable } from '@nestjs/common';
import { Challenge, PrizeItem, User } from 'src/helpers/interfaces';
import { Rank } from 'src/helpers/enums';

const mockUser: User = {
	id: '2',
	nickname: 'nickrosendo',
	name: 'Nicolas Rosendo',
	email: 'nicolas.test@rixa.com',
	creation: new Date('2020-11-10'),
	avatarUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4404.jpg?image=q_auto:best&v=1518361200'
};

const mockPrizeItem: PrizeItem = {
	id: '3',
	value: 500,
	creator: mockUser,
	creationDate: new Date('2021-12-30'),
	challengeId: '1'
}

const mockPrizeItem2: PrizeItem = {
	id: '4',
	value: 1000,
	creator: mockUser,
	creationDate: new Date('2021-12-30'),
	challengeId: '2'
}

const mockChallenges: Challenge[] = [
	{ 
		id: '1',
		creator: mockUser,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Gold,
		totalPrize: 500,
		participants: [mockUser],
		prizeItems: [mockPrizeItem]
	},
	{ 
		id: '2',
		creator: mockUser,
		creationDate: new Date('2020-12-30'),
		rank: Rank.Gold,
		totalPrize: 1000,
		participants: [mockUser],
		prizeItems: [mockPrizeItem2]
	}
]

@Injectable()
export class ChallengeService {
	
	getChallenges() {
		return mockChallenges
	}
}
