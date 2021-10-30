import { Injectable } from '@nestjs/common';
import type { ExecutionContext, CanActivate } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import type { UserService } from '../../modules/authority';
// import type { IIUserService } from '../../services/cc/ewell/authority/api/v3/service/IUserService';
// import { RelationsController } from '../../modules/relations/relations.controller';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // const request = context.switchToHttp().getRequest();

    // console.log(
    //   'context.getClass() : ',
    //   context.getClass() === RelationsController,
    //   context.getClass(),
    //   context,
    // );
    // if (context.getClass() === RelationsController) {
    //   const chance = Math.random() > 0.5;
    //   // console.log(`AuthGuard AppController ${chance}!`);
    //   return chance;
    // }

    return true;
  }
}
