import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterLinkDirectiveStub } from './stubs';

/// Dummy module to satisfy Angular Language service. Never used.
@NgModule({
  declarations: [RouterLinkDirectiveStub],
  imports: [CommonModule],
})
export class TestingModule {}
