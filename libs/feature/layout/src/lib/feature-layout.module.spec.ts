import { async, TestBed } from '@angular/core/testing';
import { FeatureLayoutModule } from './feature-layout.module';

describe('FeatureLayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureLayoutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureLayoutModule).toBeDefined();
  });
});
