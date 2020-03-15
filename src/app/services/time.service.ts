import { Injectable, OnDestroy } from '@angular/core';
import { timeRanges } from '../models/dayTimes';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {
  time = new Date();
  intervalID;
  constructor() {
    this.intervalID = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.intervalID.clearInterval();
  }

}
