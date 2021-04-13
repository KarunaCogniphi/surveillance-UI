import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDialogComponent } from '../shared/common-dialog/common-dialog.component';
import { SharedServiceService } from '../shared/shared-service.service';
import { CreateAssetComponent } from './create-asset/create-asset.component';

export interface PeriodicElement {
  id: string;
  name: string;
  category: string;
  priority: string;
  location: string;
  associatedAlerts: string;
  associatedIncidents: string;
  assignedTo: string;
  type: string;
  status: string;
  options: string;
}

@Component({
  selector: 'asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})

export class AssetListComponent implements OnInit {

  // dataSource = new MatTableDataSource<any>();
  assetListData = [
    { id: 'BM 2', name: 'Branch 2', category: 'Branch', priority: 'Critical', location: '1st line, TVM', associatedAlerts: '2', associatedIncidents: '3', assignedTo: 'CAM 0002', type: 'Fixed', status: 'Active', options: 'jj' },
    { id: 'BM 1', name: 'Branch 1', category: 'ATM', priority: 'High', location: '2nd line, TVM', associatedAlerts: '1', associatedIncidents: '4', assignedTo: 'CAM 0001', type: 'Fixed', status: 'Inactive', options: 'jj' },
    { id: 'BM 3', name: 'Branch 3', category: 'Apartments', priority: 'Medium', location: '3rd line, TVM', associatedAlerts: '2', associatedIncidents: '3', assignedTo: 'CAM 0003', type: 'Fixed', status: 'Inactive', options: 'jj' },
    { id: 'BM 4', name: 'Branch 4', category: 'Industry', priority: 'Low', location: '4th line, TVM', associatedAlerts: '4', associatedIncidents: '1', assignedTo: 'CAM 0004', type: 'Fixed', status: 'Active', options: 'jj' },
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() public child = new EventEmitter<String>();

  displayedColumns: string[] = ['select', 'id', 'name', 'category', 'priority', 'location', 'associatedAlerts', 'associatedIncidents', 'assignedTo', 'type', 'status', 'options'];
  iconName: string;

  constructor(public dialog: MatDialog, private sharedService: SharedServiceService) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.assetListData);
    this.sharedService.assetValue$.subscribe({
      next: (data: any) => {
        if (!!data && Object.keys(data).length > 0) {
          // this.newRowdata = data;
          // this.dataSource = new MatTableDataSource([]);
          var ind = this.assetListData.length;
          ++ind;
          for (const ke in data) {
            // console.log('key',ke);
            if (ke == "id") {
              // console.log('key in',ke);
              data[ke] = 'BM ' + ind;
            }
          }
          this.assetListData.unshift(data);
          this.dataSource = new MatTableDataSource(this.assetListData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          // console.log('hh',this.assetListData);
        }
      },
      error: err => { },
      complete: () => { }
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

  iconClick(iconName:string) {
    this.iconName = iconName;
  }

  openDialog(mode: string, editRow?: any): void {
    let dialogRef = this.dialog.open(CommonDialogComponent, {
      height: '98%',
      data: { component: CreateAssetComponent }
    });

    // update mode in shared service
    this.sharedService.assetMode.next(mode);

    if (mode === 'Edit') {
      this.sharedService.editAssetValue.next(editRow);
    }
  }
}
