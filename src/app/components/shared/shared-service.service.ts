import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  
  assetValue = new BehaviorSubject({});
  assetValue$ = this.assetValue.asObservable();
}
