import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImageUploadComponent } from './card-image-upload.component';

describe('CardImageUploadComponent', () => {
  let component: CardImageUploadComponent;
  let fixture: ComponentFixture<CardImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardImageUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
