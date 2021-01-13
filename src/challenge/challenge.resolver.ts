import { Resolver, ResolveField, Query, Parent } from '@nestjs/graphql';
import { Challenge } from './models/challenge.model';
import { ChallengeService } from './challenge.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.model';

@Resolver((of) => Challenge)
export class ChallengeResolver {
	constructor(
		private challengeService: ChallengeService,
		private userService: UserService,
	) {}

	@Query((returns) => [Challenge])
	async challenges() {
		return this.challengeService.getChallenges();
	}
}
