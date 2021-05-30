import { TestBed } from '@angular/core/testing';

import { GridSizesService } from './grid-sizes.service';

describe('GridSizesService', () => {
  let service: GridSizesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridSizesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
