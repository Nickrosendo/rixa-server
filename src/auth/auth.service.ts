import { Injectable, Inject } from '@nestjs/common';
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
} from 'amazon-cognito-identity-js';

import { AuthConfig } from './auth.config';

const DEFAULT_PASSWORD = 'test1234568';

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
					console.log('newPasswordRequired result: ', result);
					new_user.completeNewPasswordChallenge(
						DEFAULT_PASSWORD,
						{},
						{
							onSuccess: (newPasswordResult) => {
								resolve(newPasswordResult);
							},
							onFailure: (error) => {
								reject(error);
							},
						},
					);
				},
			});
		});
	}
}
