import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipePipe extends DatePipe implements PipeTransform {
  DATE_FMT ='dd/MMM/yyyy hh:mm:ss'

  transform(value: any, args?: any): any {
    return super.transform(value, this.DATE_FMT);
  }

}
