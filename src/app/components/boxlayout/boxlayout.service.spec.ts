import { TestBed } from '@angular/core/testing';

import { BoxlayoutService } from './boxlayout.service';

describe('BoxlayoutService', () => {
  let service: BoxlayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxlayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
