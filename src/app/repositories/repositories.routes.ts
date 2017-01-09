import { Route } from '@angular/router';
import { RepositoriesComponent } from './repositories.component';

export const RepositoriesRoutes: Route[] = [
  {
    path: 'repositories/:name',
    component: RepositoriesComponent//,
    /*children: [
      { path: 'add', component: AddRobotComponent },
      { path: ':id', component: RobotProfileComponent },
      { path: '', component: RobotListComponent },
      { path: '**', redirectTo: '' }
    ]*/
  }
];
