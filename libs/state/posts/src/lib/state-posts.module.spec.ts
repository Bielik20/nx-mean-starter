import { async, TestBed } from '@angular/core/testing';
import { StatePostsModule } from './state-posts.module';

describe('StatePostsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StatePostsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StatePostsModule).toBeDefined();
  });
});
