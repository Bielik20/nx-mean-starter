import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModalPageComponent } from './auth-modal-page.component';

describe('AuthModalPageComponent', () => {
  let component: AuthModalPageComponent;
  let fixture: ComponentFixture<AuthModalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthModalPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
