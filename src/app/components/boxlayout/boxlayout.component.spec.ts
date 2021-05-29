import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxlayoutComponent } from './boxlayout.component';

describe('BoxlayoutComponent', () => {
  let component: BoxlayoutComponent;
  let fixture: ComponentFixture<BoxlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxlayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
