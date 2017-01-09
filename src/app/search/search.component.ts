import { Component, OnInit } from '@angular/core';
import { GithubService } from '../shared/services/github/github.service';
import { RepositoryMetadata } from '../shared/services/github/repository-metadata.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _gitHubService: GithubService) {
  }

  ngOnInit() {
  }

  public repositoryLoadError: boolean = false;
  public loadingRepositories: boolean = false;

  public repositories: RepositoryMetadata[] = [];

  async onSearch(searchTerm: string) {
    this.loadingRepositories = true;

    if (!searchTerm) {
      this.repositories = [];

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
