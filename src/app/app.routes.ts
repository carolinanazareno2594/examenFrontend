import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { CoctelesComponent } from './pages/cocteles/cocteles.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'cocteles', component: CoctelesComponent },
  { path: 'dbz', component: DbzComponent },
  {
    path: 'miapi',
    loadChildren: () =>
      import('./pages/my-api/my-api-routing.module').then(
        (m) => m.MyApiRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorComponent },
];
