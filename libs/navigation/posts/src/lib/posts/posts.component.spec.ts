import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostsService } from '@nx-mean-starter/services';
import { click } from '@nx-mean-starter/testing';
import { of } from 'rxjs';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        {
          provide: PostsService,
          useValue: { getPosts: jest.fn(() => of([])) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get posts', inject([PostsService], (service: PostsService) => {
    const de = fixture.debugElement.query(By.css('button'));
    click(de);
    component.posts$.subscribe(val => expect(val).toEqual([]));
  }));
});
