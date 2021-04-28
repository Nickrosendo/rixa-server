import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query((returns) => [User], { name: 'users' })
	async getAllUsers(): Promise<User[]> {
		const users = await this.userService.getUsers();
		if (!users) {
			throw new NotFoundException();
		}
		return users;
	}

	@Query((returns) => User, { name: 'user' })
	async getUser(@Args('id') id: string): Promise<User> {
		return this.userService.getUser(id);
	}
}
