import { Request, Response, NextFunction } from 'express';

let health = true;

export function fetchError() {
  health = false;
}

export default function (url: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.url === url) {
      if (health) {
        res.status(200).end('success');
      } else {
        res.status(500).end('error');
      }
    }
    next();
  };
}
