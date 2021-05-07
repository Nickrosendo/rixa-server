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

	@Query((returns) => Boolean, { name: 'forgot_password' })
	async forgot_password(
		@Args('userName') userName: string,
		@Args('email') email: string,
	): Promise<boolean> {
		try {
			const payload = { userName, email };
			const response: boolean = await this.authService.forgot_password(payload);
			return response;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Query((returns) => Boolean, { name: 'confirm_password' })
	async confirm_password(
		@Args('confirmation_code') confirmation_code: string,
		@Args('new_password') new_password: string,
		@Args('user_name') user_name: string,
	): Promise<boolean> {
		try {
			const payload = { confirmation_code, new_password, user_name };
			const response: boolean = await this.authService.confirm_password(
				payload,
			);
			return response;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Query((returns) => Boolean, { name: 'change_password' })
	async change_password(
		@Args('userName') userName: string,
		@Args('oldPassword') oldPassword: string,
		@Args('newPassword') newPassword: string,
	): Promise<boolean> {
		try {
			const payload = { userName, oldPassword, newPassword };
			const response: boolean = await this.authService.change_password(payload);
			return response;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
