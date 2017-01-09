/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SearchBoxComponent } from '../shared/components/search-box/search-box.component';
import { GithubService } from '../shared/services/github/github.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchBoxComponent],
      providers: [
        {
          provide: GithubService,
          useValue: {
            searchRepositoriesMetadataAsync: jasmine.createSpy('GithubService.searchRepositoriesMetadataAsync()').and.returnValue()
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
