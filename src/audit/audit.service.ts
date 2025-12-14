import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoggerService } from '../logger/logger.service';

export interface AuditRecord {
  user: { id: string; name: string };
  action: string;
  timestamp: Date;
}

@Injectable()
export class AuditService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  logAction(userId: string, action: string): AuditRecord {
    const user = this.userService.findUser(userId);
    this.logger.log(`User ${user.name} performed: ${action}`, 'AuditService');

    return {
      user,
      action,
      timestamp: new Date(),
    };
  }
}
