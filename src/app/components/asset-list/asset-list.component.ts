import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  ID: string;
  Name: string;
  Category: string;
  Value: number;
  Priority: string;
  Location: string;
  Assigned: string;
  Type: string;
  Status: string;
  Options: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { ID: 'BM 2', Name: 'Branch 2', Category: 'Branch', Value: 66, Priority: 'High', Location: '1st line, TVM', Assigned: 'CAM 0002', Type: 'Fixed', Status: 'Active', Options: 'jj' },
  { ID: 'BM 1', Name: 'Branch 1', Category: 'Branch', Value: 50, Priority: 'High', Location: '1st line, TVM', Assigned: 'CAM 0001', Type: 'Fixed', Status: 'Inactive', Options: 'jj' },
  { ID: 'BM 3', Name: 'Branch 3', Category: 'Branch 4', Value: 33, Priority: 'Low', Location: '1st line, TVM', Assigned: 'CAM 0003', Type: 'Fixed', Status: 'Inactive', Options: 'jj' },
];

@Component({
  selector: 'asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})

export class AssetListComponent implements OnInit {

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'ID', 'Name', 'Category', 'Value', 'Priority', 'Location', 'Assigned', 'Type', 'Status', 'Options'];
  tabIndex: any;

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
  
  onTabClick(index){
    this.tabIndex = index;
}
}
