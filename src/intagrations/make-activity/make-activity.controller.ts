import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ActivityModel } from './models/activity.model';
import { MakeActivityService } from './make-activity.service';

@Controller('make-activity')
export class MakeActivityController {
  constructor(private readonly makeActivityService: MakeActivityService) {}

  @Get()
  MakeActivity(): Observable<ActivityModel> {
    return this.makeActivityService.createActivity();
  }
}
