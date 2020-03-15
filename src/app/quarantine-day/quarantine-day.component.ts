import { Component, OnInit } from '@angular/core';
import { TimeService } from '../services/time.service';
import { timeRanges } from '../models/dayTimes';

@Component({
  selector: 'app-quarantine-day',
  templateUrl: './quarantine-day.component.html',
  styleUrls: ['./quarantine-day.component.scss']
})
export class QuarantineDayComponent implements OnInit {
  data = timeRanges;
  // segment = this.data[0];
  // time = this.timeService.time;
  constructor(private timeService: TimeService) { 
    // this.time = this.timeService.time;
  }

  ngOnInit() {
    console.log(this.segment);
    
  }

  get time() {
    return this.timeService.time;
  }

  get segment() {
    return this.data
      .find(section => this.time.getHours() >= section.range[0] && this.time.getHours() < section.range[1]) || this.data[0];
  }

}
