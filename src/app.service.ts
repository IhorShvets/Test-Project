import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { AgePredictionResponseModel } from './models/AgePrediction.response.model';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  predictName(
    name: string,
  ): Observable<AxiosResponse<AgePredictionResponseModel[]>> {
    return this.httpService
      .get(`https://api.agify.io/?name=${name}`)
      .pipe(map((response) => response.data));
  }
}
