import { Resolver, Query, Args } from '@nestjs/graphql';

import { Challenge } from './models/challenge.model';
import { ChallengeService } from './challenge.service';

@Resolver((of) => Challenge)
export class ChallengeResolver {
	constructor(private challengeService: ChallengeService) {}

	@Query((returns) => [Challenge], { name: 'getAllChallenges' })
	async getAllChallenges(): Promise<Challenge[]> {
		return this.challengeService.getChallenges();
	}

	@Query((returns) => Challenge, { name: 'getChallengeById' })
	async getChallengeById(@Args('id') id: string) {
		return this.challengeService.getChallenge(id);
	}

	@Query((returns) => [Challenge], { name: 'getChallengesByCreatorId' })
	async getChallengesByCreatorId(@Args('creatorId') creatorId: string) {
		return this.challengeService.getChallengesById(creatorId);
	}
}
