import { Module } from '@nestjs/common';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChallengeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
