import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TGenericEvent } from '../../tools/global-types';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnDestroy {
  @Input() debounceTime = 300;
  @Output() searchValue = new EventEmitter<string>();
  inputSearch$ = new Subject<string>();

  constructor() {
    this.inputSearch$
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((value) => this.searchValue.emit(value));
  }

  ngOnDestroy(): void {
    this.inputSearch$.unsubscribe();
  }

  inputHandler($event: TGenericEvent<HTMLInputElement>): void {
    const searchValue = $event.target.value.toLowerCase().trim();
    this.inputSearch$.next(searchValue);
  }
}
