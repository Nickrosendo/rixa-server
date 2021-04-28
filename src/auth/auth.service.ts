import { Injectable, Inject } from '@nestjs/common';
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
	CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

import { AuthConfig } from './auth.config';

interface DefaultAuthUserData {
	userName: string;
	email: string;
	password: string;
}

@Injectable()
export class AuthService {
	private user_pool: CognitoUserPool;
	constructor(
		@Inject('AuthConfig')
		private readonly auth_config: AuthConfig,
	) {
		this.user_pool = new CognitoUserPool({
			UserPoolId: this.auth_config.user_pool_id,
			ClientId: this.auth_config.client_id,
		});
	}

	async sign_up({ userName, password, email }: DefaultAuthUserData) {
		const userAttributes = [
			new CognitoUserAttribute({ Name: 'email', Value: email }),
		];

		return new Promise((resolve, reject) => {
			this.user_pool.signUp(
				userName,
				password,
				userAttributes,
				null,
				(error, result) => {
					if (error) {
						return reject(error);
					}

					return resolve(result);
				},
			);
		});
	}

	async verify_account(payload: {
		userName: string;
		email: string;
		verified_token: string;
	}) {
		return new Promise((resolve, reject) => {
			const user_data = {
				Username: payload.userName,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);
			user.confirmRegistration(payload.verified_token, true, (err, result) => {
				if (err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}

	authenticate_user(user: { name: string; password: string }) {
		const { name, password } = user;

		const authentication_details = new AuthenticationDetails({
			Username: name,
			Password: password,
		});

		const user_data = {
			Username: name,
			Pool: this.user_pool,
		};

		const new_user = new CognitoUser(user_data);

		return new Promise((resolve, reject) => {
			return new_user.authenticateUser(authentication_details, {
				onSuccess: (result) => {
					resolve(result);
				},
				onFailure: (error) => {
					reject(error);
				},
				newPasswordRequired: (result) => {
					reject(
						new Error(
							`You received an email on ${result.email} to update your default password.`,
						),
					);
				},
			});
		});
	}

	async forgot_password(payload: { userName: string; email: string }) {
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
					resolve(result);
				},
			});
		});
	}

	async change_password(payload: {
		userName: string;
		oldPassword: string;
		newPassword: string;
	}) {
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
					resolve(result);
				},
			);
		});
	}
}
