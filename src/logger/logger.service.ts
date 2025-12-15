import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string, context?: string) {
    console.log(
      `[${context || 'App'}] ${message} - ${new Date().toISOString()}`,
    );
  }
}
