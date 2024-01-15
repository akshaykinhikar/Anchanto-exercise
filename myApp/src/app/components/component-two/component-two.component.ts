import { Component } from '@angular/core';
import { CmsService } from 'src/app/cms.service';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss']
})
export class ComponentTwoComponent {
selectedCountry: string = '';

  constructor(private cmsService: CmsService) {}
  
  ngOnInit(): void {
    this.cmsService.getUpdatedCountry().subscribe(
      res => {
        this.selectedCountry = res;
      }
    );
  }
}