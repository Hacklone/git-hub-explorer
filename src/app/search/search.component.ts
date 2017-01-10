import { Component, OnInit, ElementRef } from '@angular/core';
import { GithubService } from '../shared/services/github/github.service';
import { RepositoryMetadata } from '../shared/services/github/repository-metadata.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _gitHubService: GithubService,
              private _element: ElementRef) {
  }

  ngOnInit() {
    //TODO: Focus element with directive
    this._element.nativeElement.querySelector('app-search-box input').focus();
  }

  public repositoryLoadError: boolean = false;
  public loadingRepositories: boolean = false;

  public repositories: RepositoryMetadata[] = [];

  async onSearch(searchTerm: string) {
    this.loadingRepositories = true;

    this.repositories = [];

    if (!searchTerm) {
      this.repositoryLoadError = false;
    } else {
      try {
        this.repositories = await this._gitHubService.searchRepositoriesMetadataAsync(searchTerm);

        this.repositoryLoadError = false;
      } catch (e) {
        this.repositoryLoadError = true;
      }
    }

    this.loadingRepositories = false;
  }
}
