import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GithubService } from '../shared/services/github/github.service';
import { RepositoryMetadata } from '../shared/services/github/repository-metadata.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  private _routeParametersSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _gitHubService: GithubService) { }

  public repository: RepositoryMetadata;

  ngOnInit() {
    this._routeParametersSubscription = this._route.params.subscribe(async params => {
      const repositoryName = params['name'];

      if(repositoryName) {
        this.repository = await this._gitHubService.getRepositoryMetadataByFullNameAsync(repositoryName);
      }
    });
  }

  ngOnDestroy() {
    this._routeParametersSubscription.unsubscribe();
  }
}
