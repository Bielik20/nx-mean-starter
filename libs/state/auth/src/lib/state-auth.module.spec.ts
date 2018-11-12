import { async, TestBed } from '@angular/core/testing';

import { StateAuthModule } from './state-auth.module';

describe('StateAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateAuthModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateAuthModule).toBeDefined();
  });
});
