import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { RepositoriesRoutes } from './repositories/repositories.routes';

const routeConfigs: Routes = [
  { path: '', component: SearchComponent },
  ...RepositoriesRoutes,
  { path: '**', redirectTo: 'search' }
];

export const AppRoutes = RouterModule.forRoot(routeConfigs);
