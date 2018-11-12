import { async, TestBed } from '@angular/core/testing';
import { NavigationPostsModule } from './navigation-posts.module';

describe('NavigationPostsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationPostsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NavigationPostsModule).toBeDefined();
  });
});
