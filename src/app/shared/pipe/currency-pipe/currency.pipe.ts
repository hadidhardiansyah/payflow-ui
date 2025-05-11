import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: string | number,
    currencyCode: string = 'IDR',
    locale: string = 'en-US'
  ): string {
    if (value == null || value === '') return '';

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) return `${currencyCode} 0`;

    const formattedNumber = numericValue.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return `${currencyCode} ${formattedNumber}`;
  }
}
