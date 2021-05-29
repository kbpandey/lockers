import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridlayoutComponent } from './gridlayout.component';

describe('GridlayoutComponent', () => {
  let component: GridlayoutComponent;
  let fixture: ComponentFixture<GridlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridlayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
