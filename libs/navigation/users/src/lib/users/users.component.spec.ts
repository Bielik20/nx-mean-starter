import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersService } from '@nx-mean-starter/services';
import { click } from '@nx-mean-starter/testing';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        {
          provide: UsersService,
          useValue: { getAll: jest.fn(() => of([])) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', inject([UsersService], (service: UsersService) => {
    const de = fixture.debugElement.query(By.css('button'));
    click(de);
    component.users$.subscribe(val => expect(val).toEqual([]));
  }));
});
