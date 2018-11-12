import { async, TestBed } from '@angular/core/testing';
import { StateRouterModule } from './state-router.module';

describe('StateRouterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateRouterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateRouterModule).toBeDefined();
  });
});
