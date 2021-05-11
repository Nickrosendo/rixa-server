import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';

describe('AuthController', () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
			controllers: [AuthController],
			providers: [AuthConfig, AuthService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('login endpoint', () => {
		it('should return user-tokens when sucessfull login', async () => {
			const mockUser = {
				name: 'test',
				password: 'test',
			};
			const mockResponse: any = {
				idToken: {},
				refreshToken: {},
				accessToken: {},
				clockDrift: 0,
			};
			jest
				.spyOn(service, 'login')
				.mockImplementation(() => Promise.resolve(mockResponse));
			const response = await controller.login(mockUser);
			expect(response).toBe(mockResponse);
		});
	});

	describe('sign_up endpoint', () => {
		it('should return true when sucessfull sign_up', async () => {
			const mockUser = {
				userName: 'test_sign_up',
				email: 'test@sign_up.com',
				password: 'test_sign_up',
			};
			const mockResponse: any = true;
			jest
				.spyOn(service, 'sign_up')
				.mockImplementation(() => Promise.resolve(mockResponse));
			const response = await controller.sign_up(mockUser);
			expect(response).toBe(mockResponse);
		});
	});

	describe('verify_account endpoint', () => {
		it('should return true when sucessfull verify_account', async () => {
			const mockUser = {
				userName: 'test_sign_up',
				email: 'test@sign_up.com',
				verified_token: 'token-test',
			};
			const mockResponse: any = true;
			jest
				.spyOn(service, 'verify_account')
				.mockImplementation(() => Promise.resolve(mockResponse));
			const response = await controller.verify_account(mockUser);
			expect(response).toBe(mockResponse);
		});
	});

	describe('forgot_password endpoint', () => {
		it('should return true when sucessfull forgot_password', async () => {
			const mockUser = {
				userName: 'test',
				email: 'test@test.com',
			};
			const mockResponse: any = true;
			jest
				.spyOn(service, 'forgot_password')
				.mockImplementation(() => Promise.resolve(mockResponse));
			const response = await controller.forgot_password(mockUser);
			expect(response).toBe(mockResponse);
		});
	});
});
