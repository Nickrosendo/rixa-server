import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			playground: true,
			debug: false
		}),
		UserModule,
		ChallengeModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
