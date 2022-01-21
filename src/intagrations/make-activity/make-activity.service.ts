import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ActivityModel } from './models/activity.model';

@Injectable()
export class MakeActivityService {
  constructor(private httpService: HttpService) {}

  createActivity(): Observable<AxiosResponse<ActivityModel>> {
    return this.httpService
      .get(`https://www.boredapi.com/api/activity/`)
      .pipe(map((response) => response.data));
  }
}
