import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  @Input() imageControl;
  
  imageUploadObj = { label: 'Upload Assets Image', viewText: 'Upload Image' };
  fileUploadObj = { label: 'Upload Document', viewText: 'Upload Document' };
  
  imageViewForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  curAddress: any;
    
  public handleAddressChange(address: any) {
    console.log(address.formatted_address);
    this.curAddress = address.formatted_address;
  // Do some stuff
}

  constructor(private formbuilder: FormBuilder, private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.imageViewForm = this.formbuilder.group({
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
 
}
