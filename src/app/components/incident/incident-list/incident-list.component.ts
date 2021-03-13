import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Id: string;
  Desc: string;
  AssetId: string;
  Priority: string;
  Severity: string;
  SlaBreach: string;
  Category: string;
  SubCategory: string;
  CreationDate: string;
  CreationTime: string;
  AssignedTo: string;
  Status: string;
  Remark: string;
  Action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Id: 'ID 1', Desc: 'Branch 1', AssetId: 'BBM 1', Priority: 'Critical', Severity: 'Critical', SlaBreach: 'No', Category: '-', SubCategory: '-', CreationDate:'20-01-2021', CreationTime: ' 12:00 PM', AssignedTo: 'Ahmed Khan', Status: 'Close', Remark: 'sss', Action: 'jj' },
  { Id: 'ID 2', Desc: 'Branch 2', AssetId: 'BBM 2', Priority: 'Medium', Severity: 'Medium', SlaBreach: 'Yes', Category: '-', SubCategory: '-', CreationDate:'20-01-2021', CreationTime: ' 12:00 PM', AssignedTo: 'Fer', Status: 'Close', Remark: 'aaa', Action: 'let' },
  { Id: 'ID 3', Desc: 'Branch 3', AssetId: 'BBM 3', Priority: 'Medium', Severity: 'High', SlaBreach: 'Yes', Category: '-', SubCategory: '-', CreationDate:'20-01-2021', CreationTime: ' 12:00 PM', AssignedTo: 'Fer', Status: 'Close', Remark: 'aaa', Action: 'let' },
  { Id: 'ID 4', Desc: 'Branch 4', AssetId: 'BBM 4', Priority: 'Low', Severity: 'Low', SlaBreach: 'No', Category: '-', SubCategory: '-', CreationDate:'20-01-2021', CreationTime: ' 12:00 PM', AssignedTo: 'Fer', Status: 'Close', Remark: 'aaa', Action: 'let' },
];

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'Id', 'Desc', 'AssetId', 'Priority', 'Severity', 'SlaBreach', 'Category', 'SubCategory', 'CreationTime', 'AssignedTo', 'Status', 'Remark', 'Action'];
  tabIndex: any;
  curRow: any;
  incidentName: any;

  constructor() { }


  ngOnInit(): void {
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

  onTabClick(index) {
    this.tabIndex = index;
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

  // editRow(assetName, curRow) {
  //   this.tabIndex = assetName;
  //   this.curRow = curRow;
  //    console.log(this.tabIndex, curRow);
  // }
}
