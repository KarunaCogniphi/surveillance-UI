import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SharedServiceService } from '../../shared/shared-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit, OnChanges {

  categoryArray = ['Select Category', 'Apartments', 'Bank', 'Office', 'ATM', 'Branch', 'Industry'];
  priorityArray = ['Select Priority', 'Critical', 'High', 'Medium', 'Low'];
  typeArray = ['Select Type', 'Fixed', 'None'];
  statusArray = ['Select Status', 'Active', 'Inactive'];
  imageUploadObj = { label: 'Upload Assets Image', viewText: 'Upload Image' };
  fileUploadObj = { label: 'Upload Document', viewText: 'Upload Document' };

  createAssetForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  curAddress: any;
  editDataFromAssetList: any;

  public handleAddressChange(address: any) {
    // console.log(address.formatted_address);
    this.curAddress = address.formatted_address;
  }

  constructor(private formbuilder: FormBuilder, private sharedService: SharedServiceService, private dialogRef: MatDialogRef<CreateAssetComponent>) { }

  ngOnInit(): void {
    this.createAssetForm = this.formbuilder.group({
      id: [],
      name: ['', Validators.required],
      category: ['', Validators.required],
      value: ['No Asset Value'],
      priority: [Validators.required],
      location: ['', Validators.required],
      assignedTo: [''],
      associatedAlerts: 0,
      associatedIncidents: 0,
      type: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.getMode();
    // this.editAsset();
  }

  ngOnChanges() {
    // this.createAssetForm.reset();
  }

  createAsset(formData) {
    formData.location = this.curAddress;
    if (formData) {
      this.sharedService.assetValue.next(formData);
      this.cancel();
    }
  }

  getMode() {
    this.sharedService.assetMode$.subscribe({
      next: (data: any) => {
       if(data === 'Edit') {
          this.editAsset();
        }
      },
      error: err => { },
      complete: () => { }
    })
  }

  editAsset() {
    this.sharedService.editAssetValue$.subscribe({
      next: (data: any) => {
        if (!!data && Object.keys(data).length > 0) {
          this.editDataFromAssetList = data;
          this.patchAssetForm(this.editDataFromAssetList);
        }
      },
      error: err => { },
      complete: () => { }
    })
  }

  patchAssetForm(editData) {
    // console.log('editData', editData);
    this.createAssetForm.patchValue({
      name: editData.name,
      category: editData.category,
      priority: editData.priority,
      location: editData.location,
      assignedTo: editData.assignedTo,
      type: editData.type,
      status: editData.status,
    });
  }
  public cancel() {
    this.createAssetForm.reset();
    this.dialogRef.close();
  }
}

