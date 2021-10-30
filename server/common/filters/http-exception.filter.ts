import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { Response } from 'express';

// 需要 Catch() 修饰且需要继承 ExceptionFilter
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 过滤器需要有catch(exception: T, host: ArgumentsHost)方法
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const msg = exception.message;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 这里对 res 的处理就是全局错误请求返回的格式
    response.status(status).json({
      code: -1,
      data: null,
      status,
      msg,
    });
  }
}
