import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SharedServiceService } from '../../shared/shared-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {

  @Output() public child = new EventEmitter<String>();
  @Output() public formData = new EventEmitter<String>();
  receivedData:any; 

  categoryArray = [
    { id: 0, name: 'Select Category' },
    { id: 1, name: 'Apartments' },
    { id: 2, name: 'Bank' },
    { id: 3, name: 'Office' },
    { id: 4, name: 'ATM' }
  ];
  priorityArray = [
    { id: 0, name: 'Select Priority' },
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' },
  ];
  typeArray = [
    { id: 0, name: 'Select Type' },
    { id: 1, name: 'Fixed' },
    { id: 2, name: 'None' },
  ];
  statusArray = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
  ];
  imageUploadObj = { label: 'Upload Assets Image', viewText: 'Upload Image' };
  fileUploadObj = { label: 'Upload Document', viewText: 'Upload Document' };
  
  createAssetForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  curAddress: any;
    
  public handleAddressChange(address: any) {
    console.log(address.formatted_address);
    this.curAddress = address.formatted_address;
  // Do some stuff
}

  constructor(private formbuilder: FormBuilder, private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.createAssetForm = this.formbuilder.group({
      id: [],
      name: ['', Validators.required],
      category: [Validators.required],
      value: [''],
      priority: [Validators.required],
      location: ['',Validators.required],
      assignedTo: [''],
      associatedAlerts: 0,
      associatedIncidents: 0,
      type: ['',Validators.required],
      status: ['',Validators.required]
    });
  }

  createAsset(formData) {
    formData.location = this.curAddress;
    if(formData) {
      this.sharedService.assetValue.next(formData);
      this.child.emit('close');
    }
  }

  onNoClick() {
    this.child.emit('close');
  }
}
