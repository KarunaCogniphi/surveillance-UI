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

  @Output() public child = new EventEmitter<String>();
  @Output() public formData = new EventEmitter<String>();
  receivedData: any;
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
  categoryValue: any = undefined;

  public handleAddressChange(address: any) {
    // console.log(address.formatted_address);
    this.curAddress = address.formatted_address;
    // Do some stuff
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
      // this.child.emit('close');
      this.cancel();
    }
  }

  getMode() {
    this.sharedService.assetMode$.subscribe({
      next: (data: any) => {
        
        if (data === 'Add') {
          this.resetForm();
        } else if(data === 'Edit') {
          this.editAsset();
        }
      },
      error: err => { },
      complete: () => { }
    })
  }


  resetForm() {
    // alert('insideReset');
    this.createAssetForm.reset();
      // this.createAssetForm.get('category').patchValue('');
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
    // this.createAssetForm.reset();
    console.log('editData', editData);
    //  this.categoryValue = editData.category;

    
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
