import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

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
  createIncidentForm: FormGroup;
  @Input() curRow: any;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createIncidentForm = this.formbuilder.group({
      desc: [],
      assetId: [''],
      status: [],
      priority: [''],
      severity: []
    });
  }
  ngOnChanges() {
    console.log('curRow', this.curRow);
    // this.createIncidentForm.reset();
    // this.createIncidentForm.patchValue({
    //   desc: this.curRow.desc,
    //   assetId: this.curRow.assetId,
    //   status: this.curRow.status,
    //   priority: this.curRow.priority
    // });
  }
  createIncident(formData) {
    // console.log('formData', formData);
  }
}
