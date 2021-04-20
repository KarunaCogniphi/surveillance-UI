import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  baseUrl:string = environment.localhost;
  sampleUrl:string = this.baseUrl+'UserManage/ValidateLogin';
  
  constructor(private commonService: CommonService) { }

  incidentValue = new BehaviorSubject({});
  incidentValue$ = this.incidentValue.asObservable();

  incidentMode = new BehaviorSubject('');
  incidentMode$ = this.incidentMode.asObservable();

  editIncidentValue = new BehaviorSubject('');
  editIncidentValue$ = this.editIncidentValue.asObservable();

  // sampleFuntion(data) {
  //   return this.commonService.postApi(this.sampleUrl, data);
  // }

}
