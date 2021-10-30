import { Injectable } from '@nestjs/common';
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
}

@Injectable()
export class IOInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const initBody = { datatype: 'json', i18n: 'zh' };
    if (request.method === 'GET') {
      const { uuheader = {}, ...restQuery } = request.query || {};
      Object.assign(initBody, {
        params: JSON.stringify(restQuery),
        uuheader:
          typeof uuheader === 'object' ? JSON.stringify(uuheader) : uuheader,
      });
    } else if (request.method === 'POST') {
      const { uuheader = {}, ...restBody } = request.body || {};
      Object.assign(initBody, {
        params: JSON.stringify(restBody),
        uuheader:
          typeof uuheader === 'object' ? JSON.stringify(uuheader) : uuheader,
      });
    }
    Object.assign(request.body, initBody);

    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        response.status(200);
        const res = this.formatResponse(data);
        return res;
      }),
    );
  }

  formatResponse(data: any) {
    const { code = 0, status, ...rest } = data || {};
    return { code, ...rest };
  }
}
