import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { reverseGuard } from './reverse.guard';

describe('reverseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => reverseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
