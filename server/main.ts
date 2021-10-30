import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';
import { join, resolve } from 'path';
import compression from 'compression';
import next from 'next';
import { AppModule } from './app.module';
import { DUBBO_VERSION, SERVER_PORT } from './constants';
import health from './middlewares/health';

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production', // true
  dir: resolve('.', 'client'),
  conf: require(resolve('.', 'client/next.config.js')),
});

export const nextHandle = nextApp.getRequestHandler();

async function bootstrap() {
  // const env = process.env.NODE_ENV || 'development';
  const server = new ExpressAdapter(express());

  server.get('*', function (req, res, next) {
    if (/^\/api/.test(req.url)) {
      next();
    } else {
      // 不是 api 开头的走 nextjs
      nextHandle(req, res);
    }
  });

  // 健康检查必须在权限上面
  server.use(health('/api/app/health'));

  const app = await NestFactory.create<NestExpressApplication>(AppModule, server, { bodyParser: true, cors: true });

  try {
    await nextApp.prepare();
  } catch (error) {
    console.error(error);
  }

  // For serving static files you have to use useStaticAssets() instead of setBaseViewsDir()
  app.useStaticAssets(join(__dirname, '../client'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 路径前缀：如：http://www.xxx.com/api/user
  app.setGlobalPrefix('api');
  app.use(compression()); // 启用 gzip 压缩

  const config = new DocumentBuilder()
    .setTitle('测试服务')
    // .setBasePath('api')
    .setDescription('测试服务-接口文档')
    .setVersion(DUBBO_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(SERVER_PORT);
}
bootstrap();
