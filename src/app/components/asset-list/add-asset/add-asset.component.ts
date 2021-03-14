import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {

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
  createAssetForm: FormGroup;
  fileToUpload: any;
  imageUrl: any;
  fileName: any;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAssetForm = this.formbuilder.group({
      id: [1225],
      name: [''],
      category: [],
      value: [''],
      priority: [],
      assignedTo: [''],
      type: [''],
      status: [''],
    });
  }

  createAsset(formData) {
    console.log('formData', formData);
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if(!!this.fileToUpload) {
      this.fileName = this.fileToUpload.name;
    }
    
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
