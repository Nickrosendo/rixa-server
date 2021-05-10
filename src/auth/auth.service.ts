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

	async sign_up({
		userName,
		password,
		email,
	}: DefaultAuthUserData): Promise<boolean> {
		const userAttributes = [
			new CognitoUserAttribute({ Name: 'email', Value: email }),
		];

		return new Promise((resolve, reject) => {
			this.user_pool.signUp(
				userName,
				password,
				userAttributes,
				null,
				(error) => {
					if (error) {
						return reject(error);
					}

					return resolve(true);
				},
			);
		});
	}

	async verify_account(payload: {
		userName: string;
		email: string;
		verified_token: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const user_data = {
				Username: payload.userName,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);
			user.confirmRegistration(payload.verified_token, true, (err) => {
				if (err) {
					return reject(err);
				}

				return resolve(true);
			});
		});
	}

	async login(user: { name: string; password: string }): Promise<string> {
		return this.aws_cognito.authenticateUser(user);
	}

	async forgot_password(payload: {
		userName: string;
		email: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const user_data = {
				Username: payload.userName,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);
			user.forgotPassword({
				onFailure: (error) => {
					reject(error);
				},
				onSuccess: (result) => {
					resolve(true);
				},
			});
		});
	}

	async confirm_password(payload: {
		confirmation_code: string;
		new_password: string;
		user_name: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const user_data = {
				Username: payload.user_name,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);
			user.confirmPassword(payload.confirmation_code, payload.new_password, {
				onFailure: (error) => {
					reject(error);
				},
				onSuccess: () => {
					resolve(true);
				},
			});
		});
	}

	async change_password(payload: {
		userName: string;
		oldPassword: string;
		newPassword: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const user_data = {
				Username: payload.userName,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);
			user.changePassword(
				payload.oldPassword,
				payload.newPassword,
				(error, result) => {
					if (error) {
						return reject(error);
					}
					resolve(true);
				},
			);
		});
	}
}
