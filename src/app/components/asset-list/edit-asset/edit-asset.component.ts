import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  @Output() public child = new EventEmitter<String>();
  @Output() public formData = new EventEmitter<String>();
  receivedData:any;

  categoryArray = [
    { id: 0, name: 'Select Category' },
    { id: 1, name: 'Branch 1' },
    { id: 2, name: 'Branch 2' },
    { id: 3, name: 'Branch 3' },
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
  
  editAssetForm: FormGroup;
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
    this.editAssetForm = this.formbuilder.group({
      id: 'BM 3',
      name: ['Branch 3', Validators.required],
      category: ['Branch 1',Validators.required],
      value: ['33'],
      priority: [Validators.required],
      location: ['3rd line, TVM',Validators.required],
      assignedTo: [''],
      associatedAlerts: 0,
      associatedIncidents: 0,
      type: ['',Validators.required],
      status: ['',Validators.required]
    });
  }

  editAsset(formData) {
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
