import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SharedModule } from '@nx-mean-starter/shared';
import { StoreStub } from '@nx-mean-starter/testing';
import { Subject } from 'rxjs';
import { AuthModalPageComponent } from './auth-modal-page.component';

describe('AuthModalPageComponent', () => {
  let component: AuthModalPageComponent;
  let fixture: ComponentFixture<AuthModalPageComponent>;
  let store: StoreStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [AuthModalPageComponent],
      providers: [
        StoreStub.provider,
        { provide: Actions, useValue: new Subject() },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire sing out', () => {
    expect(store.dispatch.mock.calls.length).toBe(1);
  });
});
