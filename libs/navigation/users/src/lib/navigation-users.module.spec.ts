import { async, TestBed } from '@angular/core/testing';
import { NavigationUsersModule } from './navigation-users.module';

describe('NavigationUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationUsersModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NavigationUsersModule).toBeDefined();
  });
});
