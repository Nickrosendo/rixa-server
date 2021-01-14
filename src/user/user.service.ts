import { Injectable } from '@nestjs/common';

import { User } from 'src/helpers/interfaces';

const mockUsers: User[] = [
	{
		id: '1',
		nickname: 'test',
		name: 'Test Rosendo',
		email: 'rosendo.test@rixa.com',
		creation: new Date('2020-11-10'),
		avatarUrl:
			'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4404.jpg?image=q_auto:best&v=1518361200',
	},
	{
		id: '2',
		nickname: 'nickrosendo',
		name: 'Nicolas Rosendo',
		email: 'nicolas.test@rixa.com',
		creation: new Date('2020-11-10'),
		avatarUrl:
			'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4404.jpg?image=q_auto:best&v=1518361200',
	},
];

@Injectable()
export class UserService {
	async getUsers() {
		return mockUsers;
	}

	async getUser(id: string) {
		return mockUsers.find((user: User) => user.id === id);
	}
}
