import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
			controllers: [AuthController],
			providers: [AuthConfig, AuthService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
