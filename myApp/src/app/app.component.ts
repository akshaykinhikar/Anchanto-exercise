import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'myApp';
  networkStat: boolean = false; // default flag
  networkStat$: Subscription = Subscription.EMPTY; // defined observable 

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    /* 
    used service to fetch status using Observable
    */
    this.networkStat$ = this.networkService.checkNetStat().subscribe({
      next: res => {
        this.networkStat = res
      },
      error: err => {
        console.log(err);
      }
    })
    
  }

  ngOnDestroy(): void {
    this.networkStat$.unsubscribe();
  }


}
