import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';

@Module({
  providers: [PrizeService]
})
export class PrizeModule {}
