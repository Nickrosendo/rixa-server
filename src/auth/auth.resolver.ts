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
			const jwtoken: string = await this.authService.login(user);

			return jwtoken;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Query((returns) => Boolean, { name: 'sign_up' })
	async sign_up(
		@Args('userName') userName: string,
		@Args('email') email: string,
		@Args('password') password: string,
	): Promise<boolean> {
		try {
			const new_user = { userName, email, password };
			const response: boolean = await this.authService.sign_up(new_user);
			return response;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Query((returns) => Boolean, { name: 'verify_account' })
	async verify_account(
		@Args('userName') userName: string,
		@Args('email') email: string,
		@Args('verified_token') verified_token: string,
	): Promise<boolean> {
		try {
			const payload = { userName, email, verified_token };
			const response: boolean = await this.authService.verify_account(payload);
			return response;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
