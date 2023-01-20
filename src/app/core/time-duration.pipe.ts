import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  transform(value: any, durationOption: any, args?: any): any {
    value = value * 8 * 60 * durationOption;
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return (hours > 0 ? `${hours} Hr ` : '') + (minutes > 0 ? `${minutes} Mins` : '');
  }
}
