import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private _debounceSubscription;
  private _searchStream = new Subject<string>();

  @Input()
  public debounceTime: number = 0;

  @Input()
  public placeholder: string = 'Search';

  @Output()
  public search: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this._debounceSubscription = this._searchStream.debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .subscribe(searchTerm => {
        this.search.emit(searchTerm);
      });
  }

  ngOnDestroy() {
    this._debounceSubscription.unsubscribe();
  }

  onInputKeyUp(searchInputValue: string) {
    this._searchStream.next(searchInputValue);
  }
}
