import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { UserService } from 'src/user/user.service';
import { ChallengeResolver } from './challenge.resolver';

@Module({
	providers: [ChallengeService, UserService, ChallengeResolver],
})
export class ChallengeModule {}
