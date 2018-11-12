import { inject, TestBed } from '@angular/core/testing';

import { PostsService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Service: Data', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService, { provide: HttpClient, useValue: { get: jest.fn(() => of([])) } }],
    });
  });

  it('should ...', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));

  it('should return empty array', inject([PostsService], (service: PostsService) => {
    service.getAll().subscribe(val => expect(val).toEqual([]));
  }));
});
