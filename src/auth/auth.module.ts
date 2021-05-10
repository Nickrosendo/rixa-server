import { Module } from '@nestjs/common';

import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';

// integrators
import { AWSCognito } from './integrators';

@Module({
	providers: [AWSCognito, AuthConfig, AuthService, AuthResolver],
	controllers: [AuthController],
})
export class AuthModule {}
