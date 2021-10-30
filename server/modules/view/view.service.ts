import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';
import { resolve } from 'path';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== 'production', // true
        dir: resolve('.', 'client'),
        conf: require(resolve('.', 'client/next.config.js')),
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
