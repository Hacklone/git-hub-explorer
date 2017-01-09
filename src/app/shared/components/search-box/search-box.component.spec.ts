/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    let inputBox;

    let searchSpy;
    let searchSubscription;

    beforeEach(() => {
      inputBox = fixture.debugElement.query(By.css('.form-control'));

      component.debounceTime = 300;

      searchSpy = jasmine.createSpy('searchSpy');
      searchSubscription = component.search.subscribe(searchSpy);
    });

    afterEach(() => {
      searchSubscription.unsubscribe();
    });

    it('should NOT trigger search before debounceTime is reached', fakeAsync(() => {
      inputBox.value = 'something';

      tick(100);

      expect(searchSpy).not.toHaveBeenCalled();
    }));

    it('should trigger search after debounceTime is reached', fakeAsync(() => {
      const searchValue = 'searchValue';

      inputBox.value = searchValue;

      tick(component.debounceTime);

      expect(searchSpy).not.toHaveBeenCalledWith(searchValue);
    }));
  });

  describe('placeholder', () => {
    it('should set the placeholder attribute on the search input', async(() => {
      const inputBox = fixture.debugElement.query(By.css('.form-control'));

      component.placeholder = 'placeholder text';

      fixture.detectChanges();

      expect(inputBox.nativeElement.placeholder).toEqual(component.placeholder);
    }));
  });
});
