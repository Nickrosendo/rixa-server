import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() authenticateRequest: { name: string; password: string }) {
		try {
			console.log('debug log');
			return await this.authService.authenticate_user(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post('sign_up')
	async sign_up(
		@Body()
		authenticateRequest: {
			userName: string;
			email: string;
			password: string;
		},
	) {
		try {
			return await this.authService.sign_up(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post('verify_account')
	async verify_account(
		@Body()
		authenticateRequest: {
			userName: string;
			email: string;
			verified_token: string;
		},
	) {
		try {
			return await this.authService.verify_account(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post('forgot_password')
	async forgot_password(
		@Body()
		authenticateRequest: {
			userName: string;
			email: string;
		},
	) {
		try {
			return await this.authService.forgot_password(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post('change_password')
	async change_password(
		@Body()
		authenticateRequest: {
			userName: string;
			oldPassword: string;
			newPassword: string;
		},
	) {
		try {
			return await this.authService.change_password(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
