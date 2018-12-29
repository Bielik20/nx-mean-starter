import { async, TestBed } from '@angular/core/testing';
import { StateLayoutModule } from './state-layout.module';

describe('StateLayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateLayoutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateLayoutModule).toBeDefined();
  });
});
