import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielCreateComponent } from './materiel-create.component';

describe('MaterielCreateComponent', () => {
  let component: MaterielCreateComponent;
  let fixture: ComponentFixture<MaterielCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterielCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterielCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
