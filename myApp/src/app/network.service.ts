import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, fromEvent, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

   networkStat: boolean = false;
  networkStat$: Subscription = Subscription.EMPTY;

  constructor() { }


  checkNetStat(): Observable<any> {
    this.networkStat = navigator.onLine;

    return merge(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable((sub: Observer<any>) => {
      sub.next(navigator.onLine);
      sub.complete();
    }));
  }
}
