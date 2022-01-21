import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AgePredictionResponseModel } from './models/AgePrediction.response.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(
    @Param() params,
  ): Observable<AxiosResponse<AgePredictionResponseModel[]>> {
    return this.appService.predictName(params.name);
  }
}
