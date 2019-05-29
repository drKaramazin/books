import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConditionsService {

  error = new BehaviorSubject<string>(null);

  loadingCounter = new BehaviorSubject<number>(0);

  defaultStartLoadingBehavior() {
    this.loadingCounter.next(this.loadingCounter.value + 1);
  }

  defaultEndLoadingBahavior() {
    this.loadingCounter.next(this.loadingCounter.value - 1);
  }

}
