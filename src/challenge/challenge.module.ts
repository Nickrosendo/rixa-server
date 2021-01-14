import { Module } from '@nestjs/common';

import { UserService } from '@root/user/user.service';

import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';

@Module({
	providers: [ChallengeService, UserService, ChallengeResolver],
})
export class ChallengeModule {}
