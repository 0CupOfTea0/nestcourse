import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuditResponse {
  user: { id: string | number; name: string };
  action: string;
  timestamp: Date;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AuditResponse> {
    console.log('Interceptor: Before request');

    const now = Date.now();
    const request: Request = context.switchToHttp().getRequest();
    console.log(`Request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap((response: AuditResponse) => {
        console.log(`🏁 Interceptor: After request - ${Date.now() - now}ms`);
        console.log(
          `Response: User "${response.user.name}" performed "${response.action}"`,
        );
      }),
    );
  }
}
