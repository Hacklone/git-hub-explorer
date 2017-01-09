import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routeConfigs: Routes = [
  { path: '', component: SearchComponent },
  { path: '**', redirectTo: 'search' }
];

export const AppRoutes = RouterModule.forRoot(routeConfigs);
