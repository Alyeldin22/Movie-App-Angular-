import { TestBed } from '@angular/core/testing';

import { Tv } from './tv';

describe('Tv', () => {
  let service: Tv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
