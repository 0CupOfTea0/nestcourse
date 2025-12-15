import { Controller, Get, Query } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Get('add')
  add(@Query('a') a: string, @Query('b') b: string) {
    return {
      operation: 'addition',
      a: Number(a),
      b: Number(b),
      result: this.mathService.add(Number(a), Number(b)),
    };
  }

  @Get('subtract')
  subtract(@Query('a') a: string, @Query('b') b: string) {
    return {
      operation: 'subtraction',
      a: Number(a),
      b: Number(b),
      result: this.mathService.subtract(Number(a), Number(b)),
    };
  }

  @Get('multiply')
  multiply(@Query('a') a: string, @Query('b') b: string) {
    return {
      operation: 'multiplication',
      a: Number(a),
      b: Number(b),
      result: this.mathService.multiply(Number(a), Number(b)),
    };
  }

  @Get('divide')
  divide(@Query('a') a: string, @Query('b') b: string) {
    return {
      operation: 'division',
      a: Number(a),
      b: Number(b),
      result: this.mathService.divide(Number(a), Number(b)),
    };
  }

  @Get('power')
  power(@Query('base') base: string, @Query('exponent') exponent: string) {
    return {
      operation: 'power',
      base: Number(base),
      exponent: Number(exponent),
      result: this.mathService.power(Number(base), Number(exponent)),
    };
  }

  @Get('all')
  allOperations(@Query('a') a: string, @Query('b') b: string) {
    const numA = Number(a);
    const numB = Number(b);

    return {
      a: numA,
      b: numB,
      operations: {
        add: this.mathService.add(numA, numB),
        subtract: this.mathService.subtract(numA, numB),
        multiply: this.mathService.multiply(numA, numB),
        divide: this.mathService.divide(numA, numB),
      },
    };
  }
}
