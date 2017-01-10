import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../shared/services/github/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RepositoryIssue } from '../../shared/services/github/repository-issue.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit, OnDestroy {
  private _routeParametersSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _gitHubService: GithubService) {
  }

  public issues: RepositoryIssue[];

  ngOnInit() {
    this._routeParametersSubscription = this._route.parent.params.subscribe(async params => {
      const repositoryName = params['name'];

      if (repositoryName) {
        this.issues = await this._gitHubService.getRepositoryIssuesByFullNameAsync(repositoryName);
      }
    });
  }

  ngOnDestroy() {
    this._routeParametersSubscription.unsubscribe();
  }
}
