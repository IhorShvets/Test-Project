import { Module } from '@nestjs/common';
import { MakeActivityController } from './make-activity.controller';
import { MakeActivityService } from './make-activity.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [MakeActivityController],
  providers: [MakeActivityService],
  exports: [MakeActivityService],
})
export class MakeActivityModule {}
