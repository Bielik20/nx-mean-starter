import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';

describe('Service: Users', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.get(UsersService);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array', () => {
    service.getBatch().subscribe(val => expect(val).toEqual([]));
  });
});
