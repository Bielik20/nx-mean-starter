import { async, TestBed } from '@angular/core/testing';
import { FeatureBannerModule } from './feature-banner.module';

describe('FeatureBannerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureBannerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureBannerModule).toBeDefined();
  });
});
