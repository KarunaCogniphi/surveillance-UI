import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor() { }

  assetValue = new BehaviorSubject({});
  assetValue$ = this.assetValue.asObservable();

  assetMode = new BehaviorSubject('');
  assetMode$ = this.assetMode.asObservable();

  editAssetValue = new BehaviorSubject({});
  editAssetValue$ = this.editAssetValue.asObservable();

}
