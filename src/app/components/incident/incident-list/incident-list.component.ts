import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { SharedServiceService } from '../../shared/shared-service.service';
import { AddIncidentComponent } from '../add-incident/add-incident.component';

export interface PeriodicElement {
  id: string;
  desc: string;
  assetId: string;
  priority: string;
  severity: string;
  associatedAlert: string;
  slaBreach: string;
  category: string;
  subCategory: string;
  creationDate: string;
  creationTime: string;
  assignedTo: string;
  status: string;
  remark: string;
  action: string;
}

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidentListData = [
  { id: 'ID 1', desc: 'Unauthorized Access in Gate', assetId: 'BBM 1', priority: 'Critical', severity: 'Critical', associatedAlert:'2', slaBreach: 'No', category: 'Security Breach', subCategory: 'Unauthorized', creationDate:'20-01-2021', creationTime: ' 12:00 PM', assignedTo: 'Karuna karan', status: 'Close', remark: 'sss', action: 'jj' },
  { id: 'ID 2', desc: 'Back EntranceDoor broken', assetId: 'BBM 2', priority: 'Critical', severity: 'Critical', associatedAlert:'1', slaBreach: 'Yes', category: 'Anonymous report', subCategory: 'Cafe Area', creationDate:'06-02-2021', creationTime: ' 06:30 PM', assignedTo: 'Ferose', status: 'Close', remark: 'aaa', action: 'let' },
  { id: 'ID 3', desc: 'Hall Crowded Area', assetId: 'BBM 3', priority: 'Medium', severity: 'High', associatedAlert:'0', slaBreach: 'Yes', category: 'Crowd Control', subCategory: 'Vehicle movement', creationDate:'19-01-2021', creationTime: ' 04:40 PM', assignedTo: 'Rajesh', status: 'Close', remark: 'aaa', action: 'let' },
  { id: 'ID 4', desc: 'Branch 4', assetId: 'BBM 4', priority: 'Low', severity: 'Low', associatedAlert:'0', slaBreach: 'No', category: 'Security Breach', subCategory: 'Vehicle movement', creationDate:'14-03-2021', creationTime: ' 11:33 PM', assignedTo: 'Vini Manu', status: 'Open', remark: 'aaa', action: 'let' },
  ];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'id', 'desc', 'assetId', 'priority', 'severity', 'associatedAlert', 'slaBreach', 'category', 'subCategory', 'creationTime', 'assignedTo', 'status', 'remark', 'action'];
  tabIndex: any;
  curRow: any;
  incidentName: any;
  iconName: string;

  constructor(public dialog: MatDialog, private sharedService:SharedServiceService) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.incidentListData);
    this.sharedService.incidentValue$.subscribe({
      next: (data:any) => {
        if(!!data && Object.keys(data).length>0)
        {
          // this.newRowdata = data;
          // this.dataSource = new MatTableDataSource([]);
          var ind = this.incidentListData.length;
          ++ind;
          for (const ke in data){
            // console.log('key',ke);
            if(ke == "id"){
              // console.log('key in',ke);
              data[ke] = 'ID '+ind;
            }
          }
          data['creationDate'] = '27-03-2021'; 
          data['creationTime'] = '12:10 PM';
          this.incidentListData.unshift(data);
          this.dataSource = new MatTableDataSource(this.incidentListData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: err => {},
      complete: () => {}
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  priorityStyle(priorityValue: string) {
    if (priorityValue === 'Critical') {
      return 'dot-red dot-bg-red';
    } else if (priorityValue === 'Medium') {
      return 'dot-red dot-bg-med';
    } else if (priorityValue === 'Low') {
      return 'dot-red dot-bg-low';
    } 
  }

  severityStyle(severityValue: string) {
    if (severityValue === 'Critical') {
      return 'badge-critical';
    } else if (severityValue === 'Medium') {
      return 'badge-medium';
    } else if (severityValue === 'High') {
      return 'badge-high';
    }else if (severityValue === 'Low') {
      return 'badge-low';
    }
  }
  
  slaBreachStyle(slaBreachValue: string) {
    if (slaBreachValue === 'Yes') {
      return 'text-green';
    } else if (slaBreachValue === 'No') {
      return 'text-red';
    }
  }

  openDialog(mode: string, editRow?: any): void {
    let dialogRef = this.dialog.open(CommonDialogComponent, {
      height: '98%',
      data: { component: AddIncidentComponent }
    });

    // update mode in shared service
    this.sharedService.incidentMode.next(mode);

    if (mode === 'Edit') {
      this.sharedService.editIncidentValue.next(editRow);
    }
  }

  iconClick(iconName:string) {
    this.iconName = iconName;
  }

}
