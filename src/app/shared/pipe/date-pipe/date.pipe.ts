import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(value);
    const dateValue = date.getDate().toString().padStart(2, '0');
    const monthValue = month[date.getMonth()];
    const yearValue = date.getFullYear();

    return `${dateValue} ${monthValue} ${yearValue}`;
  }
}
