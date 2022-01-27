import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ActivityModel } from './models/activity.model';

@Injectable()
export class MakeActivityErrorMapper {
  public static CreateError(
    message: string,
    statusCode: ErrorHttpStatusCode,
  ): HttpException {
    switch (statusCode) {
      case HttpStatus.NOT_FOUND:
        message = `This page is not founded`;
        break;
      case HttpStatus.BAD_GATEWAY:
        message = `Https isn't supported, try http`;
        break;
    }
    return new HttpException(message, statusCode);
  }

  public static MapModel(data: ActivityModel): ActivityModel {
    if (!data.activity)
      throw new HttpException(
        `Required field "Activity" doesn't found ${data.activity}`,
        HttpStatus.CONFLICT,
      );

    return {
      activity: data.activity,
      key: data.key,
      price: data.price,
      type: data.type,
      link: data.link,
      participants: data.participants,
      accessibility: data.accessibility,
    };
  }
}
