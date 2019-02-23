import { async, TestBed } from '@angular/core/testing';
import { FeatureCardImageModule } from './feature-card-image.module';

describe('FeatureCardImageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureCardImageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureCardImageModule).toBeDefined();
  });
});
