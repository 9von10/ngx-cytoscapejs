import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCytoscapejsComponent } from './ngx-cytoscapejs.component';

describe('NgxCytoscapejsComponent', () => {
  let component: NgxCytoscapejsComponent;
  let fixture: ComponentFixture<NgxCytoscapejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxCytoscapejsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCytoscapejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
