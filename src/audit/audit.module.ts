import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { UserService } from 'src/user/user.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AuditController],
  providers: [AuditService, UserService],
  exports: [AuditService],
})
export class AuditModule {}
