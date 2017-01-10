import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RepositoryMetadata } from './repository-metadata.model';
import { RepositoryIssue } from './repository-issue.model';

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

  public async getRepositoryIssuesByFullNameAsync(urlEncodedRepositoryFullName: string): Promise<RepositoryIssue[]> {
    return await this._http.get(`https://api.github.com/search/issues?q=repo:${urlEncodedRepositoryFullName}`)
      .map(res => res.json().items)
      .map(items => items.map(this.parseRepositoryIssue))
      .toPromise();
  }

  private parseRepositoryMetadata(repoMetadata: any): RepositoryMetadata {
    return {
      id: repoMetadata.id,
      name: repoMetadata.full_name,
      url: repoMetadata.url,
      description: repoMetadata.description,
      forksCount: repoMetadata.forks_count,
      stargazersCount: repoMetadata.stargazers_count,
      openIssuesCount: repoMetadata.open_issues_count,
      watchersCount: repoMetadata.watchers
    };
  }

  private parseRepositoryIssue(issue: any): RepositoryIssue {
    return {
      id: issue.id,
      issueNumber: issue.number,
      url: issue.url,
      title: issue.title,
      postedByUserName: issue.user.login,
      postedByUrl: issue.user.html_url,
      createdDate: new Date(issue.created_at)
    };
  }
}
