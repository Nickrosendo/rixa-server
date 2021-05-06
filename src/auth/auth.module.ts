import { Module } from '@nestjs/common';

import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';

@Module({
	providers: [AuthConfig, AuthService, AuthResolver],
	controllers: [AuthController],
})
export class AuthModule {}
