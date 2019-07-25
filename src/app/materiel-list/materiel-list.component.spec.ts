import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielListComponent } from './materiel-list.component';

describe('MaterielListComponent', () => {
  let component: MaterielListComponent;
  let fixture: ComponentFixture<MaterielListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterielListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterielListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
