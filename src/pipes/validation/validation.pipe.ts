import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: string | number | boolean, metadata: ArgumentMetadata) {
    console.log(
      `Pipe:Transforming value ${JSON.stringify(value)} for ${metadata.type}`,
    );

    if (typeof value === 'string' && metadata.type === 'param') {
      const numericValue = Number(value);

      if (!isNaN(numericValue) && value.trim() !== '') {
        return numericValue;
      }
    }

    return value;
  }
}
