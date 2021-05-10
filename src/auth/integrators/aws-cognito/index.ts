import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
} from 'amazon-cognito-identity-js';

import { AWSCognitoConfig } from './config';

interface AuthenticationPayload {
	name: string;
	password: string;
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

	async authenticateUser(user: AuthenticationPayload): Promise<string> {
		const authentication_details = new AuthenticationDetails({
			Username: user.name,
			Password: user.password,
		});

		const user_data = {
			Username: user.name,
			Pool: this.user_pool,
		};

		const new_user = new CognitoUser(user_data);

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
}
