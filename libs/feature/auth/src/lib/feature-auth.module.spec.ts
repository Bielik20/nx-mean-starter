import { async, TestBed } from '@angular/core/testing';
import { FeatureAuthModule } from './feature-auth.module';

describe('FeatureAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureAuthModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureAuthModule).toBeDefined();
  });
});
