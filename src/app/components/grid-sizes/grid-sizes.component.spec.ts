import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSizesComponent } from './grid-sizes.component';

describe('GridSizesComponent', () => {
  let component: GridSizesComponent;
  let fixture: ComponentFixture<GridSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
