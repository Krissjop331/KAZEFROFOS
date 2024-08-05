import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // Удалите следующий вызов, так как JWT не требует сессий
    // const request = context.switchToHttp().getRequest();
    // await super.logIn(request);
    return result;
  }
}