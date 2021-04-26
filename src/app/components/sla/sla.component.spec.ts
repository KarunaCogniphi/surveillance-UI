import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlaComponent } from './sla.component';

describe('SlaComponent', () => {
  let component: SlaComponent;
  let fixture: ComponentFixture<SlaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
