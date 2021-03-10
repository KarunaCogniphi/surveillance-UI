import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit, OnChanges,AfterViewInit {

  @Input() curRow: any;
  assetForm: FormGroup;
  countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" },
    { id: 5, name: "England" }
  ];
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.assetForm = this.formbuilder.group({
      country: [null],
      id: [''],
      name: [''],
      category: [this.curRow.Category],
      value: [''],
      priority: [],
      assignedTo: [''],
      type: [''],
      status: [''],
    });
  }
  ngOnChanges() {
    console.log('curRow', this.curRow);
    this.assetForm.reset();
    this.assetForm.patchValue({
      id: this.curRow.ID,
      name: this.curRow.Name,
      category: this.curRow.Category,
      value: this.curRow.Value,
      priority: this.curRow.Priority,
      assignedTo: this.curRow.Assigned,
      type: this.curRow.Type,
      status: this.curRow.Status,
    });
  }
  ngAfterViewInit()
  {
    
    
    // this.assetForm.get("country").patchValue({ id: 2, name: "Australia" });
    // if(!!this.curRow.Category) {
      // this.assetForm.get('country').setValue(this.countries[0]);
    // }
    
    // console.log(this.curRow.Category, this.assetForm.get('category').setValue(this.curRow.Category));
    // this.assetForm.controls['priority'].setValue(this.curRow.Priority, {onlySelf: true});
  }
}
