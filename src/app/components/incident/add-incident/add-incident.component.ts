import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IncidentService } from '../../../services/incident/incident.service';
import { GlobalConstants } from '../../../common/global-constants';

@Component({
  selector: 'add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  @Output() public child = new EventEmitter<String>();
  @Output() public formData = new EventEmitter<String>();

  // statusArray = ['Select Status', 'Close', 'Open', 'InProgress'];
  // severityArray = ['Select Severity', 'Critical', 'High', 'Medium', 'Low'];
  // priorityArray = ['Select Priority', 'Critical', 'Medium', 'Low'];
  // categoryArray = ['Select Category', 'Security Breach', 'Crowd Control', 'Anonymous report'];
  // subCategoryArray = ['Select Category', 'Unauthorized', 'Cafe Area', 'Vehicle movement'];

  statusArray = GlobalConstants.statusArray;
  severityArray = GlobalConstants.severityArray;
  priorityArray = GlobalConstants.priorityArray;
  categoryArray = GlobalConstants.categoryArray;
  subCategoryArray = GlobalConstants.subCategoryArray;

  fileUploadObj = { label: 'Upload Document', viewText: 'Upload Document' };
  createIncidentForm: FormGroup;
  curAddress: any;
  editDataFromIncidentList: any;
  mode: string = 'Create New Incident';
  createSaveButton: string = 'Create';
  editDetails: { location: any; mode: string; };

  constructor(private formbuilder: FormBuilder, private incidentService: IncidentService, private dialogRef: MatDialogRef<AddIncidentComponent>) { }

  ngOnInit(): void {
    this.createIncidentForm = this.formbuilder.group({
      id: [],
      desc: [],
      assetId: [''],
      status: [],
      priority: [''],
      severity: [],
      category: [],
      subCategory: [],
      location: [],
      associatedAlert: 'NA',
      slaBreach: 'No',
      assignedTo: [''],
      creationTime: new Date().getHours + ':' + new Date().getMilliseconds
    });
    this.getMode();
  }

  ngOnChanges() {
  }

  getMode() {
    this.incidentService.incidentMode$.subscribe({
      next: (data: any) => {
        if (data === 'Edit') {
          this.createSaveButton = 'Save';
          this.mode = 'Edit Incident';
          this.editIncident();
        } else {
          this.mode = 'Create New Incident';
        }
      },
      error: err => { },
      complete: () => { }
    })
  }

  editIncident() {
    this.incidentService.editIncidentValue$.subscribe({
      next: (data: any) => {
        if (!!data && Object.keys(data).length > 0) {
          this.editDataFromIncidentList = data;
          this.patchIncidentForm(this.editDataFromIncidentList);
        }
      },
      error: err => { },
      complete: () => { }
    })
  }

  patchIncidentForm(editData) {
    this.editDetails = { 'location': editData.location, 'mode': this.mode };
    this.createIncidentForm.patchValue({
      id: editData.id,
      desc: editData.desc,
      assetId: editData.assetId,
      status: editData.status,
      priority: editData.priority,
      severity: editData.severity,
      category: editData.category,
      subCategory: editData.subCategory,
      location: editData.location,
      associatedAlert: editData.associatedAlert,
      slaBreach: editData.slaBreach,
      assignedTo: editData.assignedTo,
    });
  }

  getCurAdd(address: any) {
    this.curAddress = address;
  }
  createIncident(formData) {
    formData.location = this.curAddress;
    if (formData) {
      this.incidentService.incidentValue.next(formData);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.createIncidentForm.reset();
    this.dialogRef.close();
  }
}
