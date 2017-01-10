import { Route } from '@angular/router';
import { RepositoriesComponent } from './repositories.component';
import { IssuesComponent } from './issues/issues.component';

export const RepositoriesRoutes: Route[] = [
  {
    path: 'repositories/:name',
    component: RepositoriesComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];
