import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '@/route/login/login.component';
import { HelpComponent } from '@/route/help/help.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.module').then((m) => m.ChartsModule),
  },
  { path: '**', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
