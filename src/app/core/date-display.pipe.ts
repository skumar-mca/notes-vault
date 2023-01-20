import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'dateDisplay'
})
export class DateDisplayPipe implements PipeTransform {

  transform(value: any, startTimerToCalculateTimer: string, args?: any): any {
    var TODAY = moment();
    var CURRENTDATE = moment(value);
    let dayDiff = TODAY.diff(CURRENTDATE, 'days')
    if (dayDiff === 0) {
      let diff = TODAY.diff(CURRENTDATE, 'minutes');
      let hours = Math.floor(diff / 60);
      let minutes = Math.floor(diff % 60);

      if (hours > 1) {
        return hours + ' hours ago';
      }
      if (minutes === 0) {
        return 'few seconds ago';
      }

      if (minutes < 60) {
        return minutes + ' minutes ago';
      }
    }

    if (dayDiff === 1) {
      return ' yesterday';
    }

    if (dayDiff > 1 && dayDiff > 5) {
      return 'on ' + CURRENTDATE.format("DD-MMM-YY");
    }
    return 'on ' + CURRENTDATE.format("DD-MMM-YY");
  }

}
