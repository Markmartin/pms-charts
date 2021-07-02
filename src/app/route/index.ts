import { Routes } from '@angular/router';

import { LoginComponent } from '@/route/login/login.component';
import { HelpComponent } from '@/route/help/help.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: HelpComponent },
];
