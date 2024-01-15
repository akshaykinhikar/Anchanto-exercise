import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  countrySelected: String = '';
  subject = new Subject();
  
  constructor() { }
  
  
  updateCountrySelection(data: string) {
    this.subject.next(data);
  }
  
  getUpdatedCountry(): Observable<any> {
    return this.subject.asObservable() 
  }



}
