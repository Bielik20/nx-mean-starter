import { async, TestBed } from '@angular/core/testing';
import { StateUsersModule } from './state-users.module';

describe('StateUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateUsersModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateUsersModule).toBeDefined();
  });
});
