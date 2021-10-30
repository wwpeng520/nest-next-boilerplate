import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { IOInterceptor } from './common/interceptors/io.interceptors';
import { AuthGuard } from './common/guards/auth.guards';
import { AppController } from './app.controller';
import * as modules from './modules';

// const isDev = process.env.NODE_ENV === 'development';
// let rootPath = join(__dirname, '..', 'web');
// if (isDev) {
//   rootPath = rootPath.replace('/build/', '/dist/');
// }

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath,
    //   // 除了以 「api」开头的请求地址都会返回静态 html
    //   exclude: ['/api*'],
    // }),
    ...Object.values(modules),
  ],
  controllers: [AppController],
  providers: [
    // 全局异常过滤器
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // 全局响应拦截器
    { provide: APP_INTERCEPTOR, useClass: IOInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
