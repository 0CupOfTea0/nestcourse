import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader) {
      console.log('Guard: Access blocked - No authorization header');
      throw new ForbiddenException('No authorization header');
    }

    console.log('Guard: Access granted');
    return true;
  }
}
