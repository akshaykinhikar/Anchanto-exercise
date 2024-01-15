import { Injectable } from '@angular/core';
import { Observable, Subscription, fromEvent, map, merge, of } from 'rxjs';

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
      of(null), 
      fromEvent(window, 'online'),
      fromEvent(window, 'ofline')
    ).pipe(map(() => navigator.onLine))
  }
}
