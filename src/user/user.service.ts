import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

interface User {
  id: string;
  name: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  findUser(id: string): User {
    this.logger.log(`Finding user ${id}`, 'UserService');
    return { id, name: 'John Doe' };
  }
}
