import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {

  @Output() public child = new EventEmitter<String>();
  @Output() public formData = new EventEmitter<String>();
  receivedData:any;

  statusArray = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'Close' },
    { id: 2, name: 'Open' },
    { id: 3, name: 'InProgress' },
  ];
  severityArray = [
    { id: 0, name: 'Select Severity' },
    { id: 1, name: 'Critical' },
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' },
  ];
  priorityArray = [
    { id: 0, name: 'Select Priority' },
    { id: 1, name: 'Critical' },
    { id: 2, name: 'Medium' },
    { id: 2, name: 'Low' },
  ];
  categoryArray = [
    { id: 0, name: 'Select Category' },
    { id: 1, name: 'Security Breech' },
    { id: 2, name: 'Crowd Control' },
    { id: 2, name: 'Anonymous report' },
  ];
  subCategoryArray = [
    { id: 0, name: 'Select Category' },
    { id: 1, name: 'Unauthorized' },
    { id: 2, name: 'Cafe Area' },
    { id: 2, name: 'Vehicle movement' },
  ];
  fileUploadObj = { label: 'Upload Document', viewText: 'Upload Document' };

  editIncidentForm: FormGroup;
  @Input() curRow: any;

  constructor(private formbuilder: FormBuilder, private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.editIncidentForm = this.formbuilder.group({
      id:'ID 3',
      desc: 'Unauthorized entry',
      assetId: ['BM 28'],
      status: [],
      priority: [''],
      severity: [],
      category: [],
      subCategory: [],
      associatedAlert: 'NA8',
      slaBreach: 'No',
      creationTime:new Date().getHours +':'+new Date().getMilliseconds
    });
  }
  ngOnChanges() {
    // this.createIncidentForm.reset();
    // this.createIncidentForm.patchValue({
    //   desc: this.curRow.desc,
    //   assetId: this.curRow.assetId,
    //   status: this.curRow.status,
    //   priority: this.curRow.priority
    // });
  }
  editIncident(formData) {
    if(formData) {
      this.sharedService.incidentValue.next(formData);
      this.child.emit('close');
    }
  }

  onNoClick() {
    this.child.emit('close');
  }
}
