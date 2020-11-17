import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forChild([
      {path: 'management', loadChildren: () => import('./main/modules/management/management.module').then(m => m.ManagementModule)},
      {path: 'auth', loadChildren: () => import('./main/modules/auth/auth.module').then(m => m.AuthModule)}
    ])],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppRoutingModule { }
