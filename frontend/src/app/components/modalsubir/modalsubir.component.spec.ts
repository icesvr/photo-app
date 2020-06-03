import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsubirComponent } from './modalsubir.component';

describe('ModalsubirComponent', () => {
  let component: ModalsubirComponent;
  let fixture: ComponentFixture<ModalsubirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsubirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsubirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
