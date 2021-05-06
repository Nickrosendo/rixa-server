import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Resolver((of) => Auth)
export class AuthResolver {
	constructor(private authService: AuthService) {}

	@Query((returns) => String, { name: 'login' })
	async login(
		@Args('name') name: string,
		@Args('password') password: string,
	): Promise<string> {
		try {
			const user = { name, password };
			const jwtoken: string = await this.authService.authenticate_user(user);
			if (!jwtoken) {
				throw new NotFoundException();
			}

			return jwtoken;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
