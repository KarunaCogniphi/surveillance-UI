import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(CommonDialogComponent, {
  //     data: { component: CreateAssetComponent }
  //   });
  // }
}
