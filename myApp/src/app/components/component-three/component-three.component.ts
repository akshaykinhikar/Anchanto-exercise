import { Component } from '@angular/core';
import { CmsService } from 'src/app/cms.service';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.scss']
})
export class ComponentThreeComponent {
selectedCountry: string = '';

  constructor(private cmsService: CmsService) {}
  
  ngOnInit(): void {
    this.cmsService.getUpdatedCountry().subscribe(
      res => {
        this.selectedCountry = res;
      }
    );

    // this.cmsService.updateCountrySelection("India")
  }
}