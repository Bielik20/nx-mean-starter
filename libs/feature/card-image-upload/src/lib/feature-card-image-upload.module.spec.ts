import { async, TestBed } from '@angular/core/testing';
import { FeatureCardImageUploadModule } from './feature-card-image-upload.module';

describe('FeatureCardImageUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureCardImageUploadModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureCardImageUploadModule).toBeDefined();
  });
});
