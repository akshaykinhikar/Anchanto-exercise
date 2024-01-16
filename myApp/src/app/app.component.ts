
import { Component, Inject, OnDestroy, OnInit  } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy  {

  networkStat: boolean = false; // default flag
  networkStat$: Subscription = Subscription.EMPTY; // defined observable 


  constructor(public translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private networkService: NetworkService) {
  }

  ngOnInit(): void {
    /* 
    used service to fetch status using Observable
    */
    this.networkStat$ = this.networkService.checkNetStat().subscribe({
      next: res => {
        this.networkStat = res;
        console.log('this.networkStat', this.networkStat)
      },
      error: err => {
        console.log(err);
      }
    })
    
  }

  ngOnDestroy(): void {
    this.networkStat$.unsubscribe();
  }

  public changeLanguage(lang: string) {
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar-UAE" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
  }

  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      "langCss"
    ) as HTMLLinkElement;

    let bundleName = lang === "ar" ? "arabicStyle.scss" : "englishStyle.scss";

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
}