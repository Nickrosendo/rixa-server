import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
} from 'amazon-cognito-identity-js';

import { AWSCognitoConfig } from './config';

interface AuthenticationPayload {
	name: string;
	password: string;
	user?: CognitoUser;
}

interface SignUpPayload {
	userName: string;
	password: string;
	email: string;
}

interface VerifyAccountPayload {
	userName: string;
	email: string;
	verified_token: string;
}

interface ForgotPasswordPayload {
	userName: string;
	email: string;
}

interface ConfirmPasswordPayload {
	confirmation_code: string;
	new_password: string;
	user_name: string;
}

interface ChangePasswordPayload {
	user_name: string;
	old_password: string;
	new_password: string;
}

export class AWSCognito {
	private user_pool: CognitoUserPool;
	private readonly config: AWSCognitoConfig;

	constructor() {
		this.config = new AWSCognitoConfig();

		this.user_pool = new CognitoUserPool({
			UserPoolId: this.config.user_pool_id,
			ClientId: this.config.client_id,
		});
	}

	async authenticate_user(payload: AuthenticationPayload): Promise<string> {
		const authentication_details = new AuthenticationDetails({
			Username: payload.name,
			Password: payload.password,
		});

		const user_data = {
			Username: payload.name,
			Pool: this.user_pool,
		};

		const new_user = payload.user ?? new CognitoUser(user_data);

		return new Promise((resolve, reject) => {
			return new_user.authenticateUser(authentication_details, {
				onSuccess: (result) => {
					const jwtoken: string = result.getIdToken().getJwtToken();
					resolve(jwtoken);
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

	async sign_up(newUser: SignUpPayload): Promise<boolean> {
		const user_attributes = [
			new CognitoUserAttribute({ Name: 'email', Value: newUser.email }),
		];

		return new Promise((resolve, reject) => {
			this.user_pool.signUp(
				newUser.userName,
				newUser.password,
				user_attributes,
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

	async verify_account(payload: VerifyAccountPayload): Promise<boolean> {
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

	async forgot_password(payload: ForgotPasswordPayload): Promise<boolean> {
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
				onSuccess: () => {
					resolve(true);
				},
			});
		});
	}

	async confirm_password(payload: ConfirmPasswordPayload): Promise<boolean> {
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

	async change_password(payload: ChangePasswordPayload): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const user_data = {
				Username: payload.user_name,
				Pool: this.user_pool,
			};

			const user = new CognitoUser(user_data);

			try {
				await this.authenticate_user({
					name: payload.user_name,
					password: payload.old_password,
					user,
				});
			} catch (ex) {
				return reject(ex);
			}

			user.changePassword(
				payload.old_password,
				payload.new_password,
				(error) => {
					if (error) {
						return reject(error);
					}

					resolve(true);
				},
			);
		});
	}
}
