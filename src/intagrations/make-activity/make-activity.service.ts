import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';
import { ActivityModel } from './models/activity.model';
import { MakeActivityErrorMapper } from './make-activity-error-mapper';

@Injectable()
export class MakeActivityService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(MakeActivityService.name);

  createActivity(): Observable<ActivityModel> {
    // const proxy = { host: '127.0.0.1', port: 8888 };
    // const requestConfig = { proxy };

    return this.httpService.get(`http://www.boredapi.com/api/activity/`).pipe(
      catchError((e) => {
        throw MakeActivityErrorMapper.CreateError(
          e.response.data,
          e.response.status,
        );
      }),
      map((response) => {
        const res = MakeActivityErrorMapper.MapModel(response.data);
        this.logger.log(`Input JSON`, response.data);
        this.logger.log(`JSON in our model`, res);
        return res;
      }),
    );
  }
}
