import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../shared/services/github/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RepositoryMetadata } from '../../shared/services/github/repository-metadata.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  private _routeParametersSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _gitHubService: GithubService) {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['Forks', 'Open issues', 'Stargazers', 'Watchers'];

  public barChartData: number[] = [];

  ngOnInit() {
    this._routeParametersSubscription = this._route.parent.params.subscribe(async params => {
      const repositoryName = params['name'];

      if (repositoryName) {
        const repository = await this._gitHubService.getRepositoryMetadataByFullNameAsync(repositoryName);

        this.barChartData = [
          repository.forksCount,
          repository.openIssuesCount,
          repository.stargazersCount,
          repository.watchersCount
        ];
      }
    });
  }

  ngOnDestroy() {
    this._routeParametersSubscription.unsubscribe();
  }
}
