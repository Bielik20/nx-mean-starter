import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPageComponent } from './sidenav-page.component';

describe('SidenavPageComponent', () => {
  let component: SidenavPageComponent;
  let fixture: ComponentFixture<SidenavPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
