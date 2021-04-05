import { Component, Inject, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
