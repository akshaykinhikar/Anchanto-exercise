import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit {

  selectedCountry: string = '';

  countryList = ['India', 'China', 'Pakistan'];

  constructor(private cmsService: CmsService) {}
  
  ngOnInit(): void {
    this.cmsService.getUpdatedCountry().subscribe(
      res => {
        this.selectedCountry = res;
      }
    );

    // this.cmsService.updateCountrySelection("India")
  }

  updateSelection (data: any) {
    this.cmsService.updateCountrySelection(data?.value);
  }
}
