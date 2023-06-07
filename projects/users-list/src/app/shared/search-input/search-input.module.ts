import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchInputComponent } from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [CommonModule],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
