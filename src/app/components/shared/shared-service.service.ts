import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  
  assetValue = new BehaviorSubject({});
  assetValue$ = this.assetValue.asObservable();

  assetMode = new BehaviorSubject('');
  assetMode$ = this.assetMode.asObservable();

  editAssetValue = new BehaviorSubject({});
  editAssetValue$ = this.editAssetValue.asObservable();

  incidentValue = new BehaviorSubject({});
  incidentValue$ = this.incidentValue.asObservable();
}
