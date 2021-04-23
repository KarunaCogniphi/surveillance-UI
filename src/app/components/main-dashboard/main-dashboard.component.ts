import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.setCurrentLocation();
  }
// Get Current Location Coordinates
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 15;
    });
  }
}
}
