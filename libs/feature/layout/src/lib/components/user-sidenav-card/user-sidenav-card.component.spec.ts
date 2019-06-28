import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavCardComponent } from './user-sidenav-card.component';

describe('UserCardComponent', () => {
  let component: UserSidenavCardComponent;
  let fixture: ComponentFixture<UserSidenavCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSidenavCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidenavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
