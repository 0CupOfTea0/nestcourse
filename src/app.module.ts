import { Module } from '@nestjs/common';
import { MathModule } from './math/math.module';
import { LoggerModule } from './logger/logger.module';
import { UserService } from './user/user.service';
import { AuditService } from './audit/audit.service';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [MathModule, LoggerModule, AuditModule],
  providers: [UserService, AuditService],
})
export class AppModule {}
