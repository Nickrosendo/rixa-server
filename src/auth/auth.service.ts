import { Injectable, Inject } from '@nestjs/common';
import {
	CognitoUser,
	CognitoUserPool,
	CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

import { AuthConfig } from './auth.config';
import { AWSCognito } from './integrators';

interface DefaultAuthUserData {
	userName: string;
	email: string;
	password: string;
}

@Injectable()
export class AuthService {
	private user_pool: CognitoUserPool;
	private aws_cognito: AWSCognito;
	constructor(
		@Inject('AuthConfig')
		private readonly auth_config: AuthConfig,
	) {
		this.user_pool = new CognitoUserPool({
			UserPoolId: this.auth_config.user_pool_id,
			ClientId: this.auth_config.client_id,
		});
		this.aws_cognito = new AWSCognito();
	}

	async sign_up(newUser: DefaultAuthUserData): Promise<boolean> {
		return this.aws_cognito.sign_up(newUser);
	}

	async verify_account(payload: {
		userName: string;
		email: string;
		verified_token: string;
	}): Promise<boolean> {
		return this.aws_cognito.verify_account(payload);
	}

	async login(user: { name: string; password: string }): Promise<string> {
		return this.aws_cognito.authenticate_user(user);
	}

	async forgot_password(payload: {
		userName: string;
		email: string;
	}): Promise<boolean> {
		return this.aws_cognito.forgot_password(payload);
	}

	async confirm_password(payload: {
		confirmation_code: string;
		new_password: string;
		user_name: string;
	}): Promise<boolean> {
		return this.aws_cognito.confirm_password(payload);
	}

	async change_password(payload: {
		user_name: string;
		old_password: string;
		new_password: string;
	}): Promise<boolean> {
		return this.aws_cognito.change_password(payload);
	}
}
