import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export interface PeriodicElement {
  alertId: string;
  alertName: string;
  alertType: string;
  status: string;
  severity: string;
  date: string;
  time: string;
  actionTaken: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { alertId: 'A-ID111', alertName: 'Threat Alert', alertType: 'Critical Alert', status: 'Completed', severity: 'Critical', date: '20-01-2021', time: ' 12:00 PM', actionTaken: 'Completed', action: '-'},
  { alertId: 'A-ID112', alertName: 'Unknown Alert', alertType: 'Warning Alert', status: 'Pending', severity: 'Medium', date: '20-01-2021', time: ' 12:00 PM', actionTaken: 'Unread', action: '-'},
  { alertId: 'A-ID113', alertName: 'Threat Alert', alertType: 'Critical Alert', status: 'Completed', severity: 'High', date: '20-01-2021', time: ' 12:00 PM', actionTaken: 'Read', action: '-'},
];

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public doughnutChartLabels = ['Completed', 'Pending', 'Acknowledged', 'Onhold'];
  public doughnutChartData = [15, 25, 60];
  public doughnutChartType = 'doughnut';

  public pieChartLabels = ['Critical', 'High', 'Medium', 'Low'];
  public pieChartData = [40, 25, 20, 15];
  public pieChartType = 'pie';

  lineChartData: ChartDataSets[] = [
    { data: [2, 8, 15, 20, 23, 18,20,22,25,28,32,38,40,45,55,60,2,50], label: 'Yesterday' },
    { data: [22, 33, 44, 55, 66,2, 80, 85, 90, 92, 95, 80,90, 120, 125, 135,150], label: 'Today' },
  ];

  lineChartLabels: Label[] = ['0', '1', '3', '4', '5', '6','7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18'];

  lineChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
          ticks: {
          beginAtZero: true,
          stepsize:20,
            max : 200,
          }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'alertId', 'alertName', 'alertType', 'status', 'severity', 'dateAndTime', 'actionTaken', 'action'];
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

  statusStyle(priorityValue: string) {
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
    } else if (severityValue === 'Low') {
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

}
