import { async, TestBed } from '@angular/core/testing';
import { StateSettingsModule } from './state-settings.module';

describe('StateSettingsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateSettingsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateSettingsModule).toBeDefined();
  });
});
