import { async, TestBed } from '@angular/core/testing';
import { StateRootModule } from './state-root.module';

describe('StateRootModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateRootModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateRootModule).toBeDefined();
  });
});
