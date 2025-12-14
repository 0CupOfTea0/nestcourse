import { Controller, Get, Query } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Get('add')
  add(@Query('a') a: string, @Query('b') b: string) {
    return {
      result: this.mathService.add(Number(a), Number(b)),
    };
  }
}
