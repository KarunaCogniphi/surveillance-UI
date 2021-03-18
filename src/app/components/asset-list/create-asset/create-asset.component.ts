import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {

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
  startDate = new Date(1990, 0, 1);
  imageFiles = [];

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAssetForm = this.formbuilder.group({
      id: [],
      name: [''],
      category: [],
      value: [''],
      priority: [],
      location: [''],
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
    if (!!this.fileToUpload) {
      this.fileName = this.fileToUpload.name;
    }
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  handleFileInput2(event) {
    const files = event.target.files;
    if(!!files) {
      this.imageFiles.push(files[0]);
    }
  }

  removeImage(image) {
    console.log(this.imageFiles.length);
    const indx = this.imageFiles.indexOf(image);
    this.imageFiles.splice(indx,1);
    // console.log(this.imageFiles.length);
  }
}
