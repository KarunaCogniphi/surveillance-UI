import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedServiceService } from '../shared/shared-service.service';

export interface PeriodicElement {
  id: string;
  name: string;
  category: string;
  value: number;
  priority: string;
  location: string;
  assignedTo: string;
  type: string;
  status: string;
  options: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 'BM 2', name: 'Branch 2', category: 'Branch', value: 66, priority: 'High', location: '1st line, TVM', assignedTo: 'CAM 0002', type: 'Fixed', status: 'Active', options: 'jj' },
  { id: 'BM 1', name: 'Branch 1', category: 'Branch', value: 50, priority: 'High', location: '1st line, TVM', assignedTo: 'CAM 0001', type: 'Fixed', status: 'Inactive', options: 'jj' },
  { id: 'BM 3', name: 'Branch 3', category: 'Branch 4', value: 33, priority: 'Low', location: '1st line, TVM', assignedTo: 'CAM 0003', type: 'Fixed', status: 'Inactive', options: 'jj' },
];

@Component({
  selector: 'asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})

export class AssetListComponent implements OnInit {

  // dataSource = new MatTableDataSource<any>();
  assetListData = [
    { id: 'BM 2', name: 'Branch 2', category: 'Branch', value: 66, priority: 'High', location: '1st line, TVM', assignedTo: 'CAM 0002', type: 'Fixed', status: 'Active', options: 'jj' },
    { id: 'BM 1', name: 'Branch 1', category: 'Branch', value: 50, priority: 'High', location: '1st line, TVM', assignedTo: 'CAM 0001', type: 'Fixed', status: 'Inactive', options: 'jj' },
    { id: 'BM 3', name: 'Branch 3', category: 'Branch 4', value: 33, priority: 'Low', location: '1st line, TVM', assignedTo: 'CAM 0003', type: 'Fixed', status: 'Inactive', options: 'jj' },
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'id', 'name', 'category', 'value', 'priority', 'location', 'assignedTo', 'type', 'status', 'options'];
  tabIndex: any;
  assetName: any;
  curRow: any;
  newRowdata: {};

  constructor(public dialog: MatDialog, private sharedService:SharedServiceService) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.assetListData);
    this.sharedService.assetValue$.subscribe({
      next: (data:any) => {
        if(!!data && Object.keys(data).length>0)
        {
          // this.newRowdata = data;
          // this.dataSource = new MatTableDataSource([]);
          this.assetListData.unshift(data);
          this.dataSource = new MatTableDataSource(this.assetListData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log('hh',this.assetListData);
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

  onTabClick(index) {
    this.tabIndex = index;
  }

  editRow(assetName, curRow) {
    this.assetName = assetName;
    this.curRow = curRow;
    // console.log(this.assetName, curRow);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<create-asset (child)="linkToggler($event)"></create-asset>`
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    linkToggler(event) {
    this.dialogRef.close();
  }
}