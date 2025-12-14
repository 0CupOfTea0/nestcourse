import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ValidationPipe } from '../pipes/validation/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging/logging.interceptor';

@Controller('audit')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(':userId/:action')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  logAction(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('action') action: string,
  ) {
    console.log('Controller: Handling request');
    return this.auditService.logAction(userId.toString(), action);
  }
}
