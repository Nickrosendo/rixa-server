import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
	public user_pool_id: string = process.env.COGNITO_USER_POOL_ID;
	public client_id: string = process.env.COGNITO_CLIENT_ID;
	public region: string = process.env.COGNITO_REGION;
	public authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
}
