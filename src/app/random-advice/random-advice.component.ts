import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription, Observable } from 'rxjs';
import { Slip } from '../models/interfaces';

@Component({
  selector: 'app-random-advice',
  templateUrl: './random-advice.component.html',
  styleUrls: ['./random-advice.component.scss']
})
export class RandomAdviceComponent implements OnInit, OnDestroy {
  randomAdvice: any;
  adviceSlips$: Observable<any>;
  randoSubscription: Subscription;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.getRandomAdvice();
    this.apiService.getNfCountries().subscribe(resp => {
      console.log('resp', resp);
    });
  }

  getRandomAdvice() {
    this.randoSubscription = this.apiService.getRandomAdvice().subscribe((data: Slip) => {
      this.randomAdvice = data.slip;
    });
  }

  ngOnDestroy(): void {
    if (this.randoSubscription) {
      this.randoSubscription.unsubscribe();
    }
  }
}
