import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@nx-mean-starter/shared';
import { StoreStub } from '@nx-mean-starter/testing';
import { LayoutComponent, NavbarComponent } from '../../components';
import { LayoutPageComponent } from './layout-page.component';

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, RouterTestingModule],
      declarations: [LayoutPageComponent, NavbarComponent, LayoutComponent],
      providers: [StoreStub.provider],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
