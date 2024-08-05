import {
    Injectable,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtAuthGuard } from './jwt-auth.guard';
  
  @Injectable()
  export class RolesGuard extends JwtAuthGuard {
    constructor(private reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return roles.includes(user.role);
    }
  }