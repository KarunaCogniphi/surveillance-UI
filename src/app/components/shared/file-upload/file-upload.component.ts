import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploadingFiles = [];
  label:string;
  viewText:string;
  @Input() fileControl;

  constructor() { }

  ngOnInit(): void {
    this.label = this.fileControl.label;
    this.viewText = this.fileControl.viewText;
    console.log('label', this.label, this.viewText);
  }

  handleFileInput(event) {
    const files = event.target.files;
    if (!!files) {
      this.uploadingFiles.push(files[0]);
    }
  }

  removeImage(image) {
    const indx = this.uploadingFiles.indexOf(image);
    this.uploadingFiles.splice(indx, 1);
  }

}
