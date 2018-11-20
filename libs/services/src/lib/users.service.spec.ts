import { HttpClient } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';

describe('Service: Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, { provide: HttpClient, useValue: { get: jest.fn(() => of([])) } }],
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should return empty array', inject([UsersService], (service: UsersService) => {
    service.getAll().subscribe(val => expect(val).toEqual([]));
  }));
});
