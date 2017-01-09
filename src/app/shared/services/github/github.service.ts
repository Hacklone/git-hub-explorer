import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RepositoryMetadata } from './repository-metadata.model';

@Injectable()
export class GithubService {
  constructor(private _http: Http) {
  }

  public async searchRepositoriesMetadataAsync(repositorySearch: string): Promise<RepositoryMetadata[]> {
    const urlEncodedRepositoryName = encodeURIComponent(repositorySearch);

    return await this._http.get(`https://api.github.com/search/repositories?q=${urlEncodedRepositoryName}`)
      .map(res => res.json().items)
      .map(items => items.map(this.parseRepositoryMetadata))
      .toPromise();
  }

  public async getRepositoryMetadataByFullNameAsync(urlEncodedRepositoryFullName: string): Promise<RepositoryMetadata> {
    return await this._http.get(`https://api.github.com/search/repositories?q=repo:${urlEncodedRepositoryFullName}`)
      .map(res => res.json().items[0])
      .map(this.parseRepositoryMetadata)
      .toPromise();
  }

  private parseRepositoryMetadata(repoMetadata): RepositoryMetadata {
    return {
      id: repoMetadata.id,
      name: repoMetadata.full_name,
      url: repoMetadata.url,
      description: repoMetadata.description,
      forksCount: repoMetadata.forks_count,
      stargazersCount: repoMetadata.stargazers_count,
      openIssuesCount: repoMetadata.open_issues_count
    };
  }
}
