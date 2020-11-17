import { CommonModule                      } from '@angular/common'      ;
import { NgModule                          } from '@angular/core'        ;
import { RouterModule                      } from '@angular/router'      ;
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPageComponent} from './pages/login/login.component';
import {LogoutPageComponent} from './pages/logout/logout.page';
import {AUTH_ROUTES} from './auth.routes';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent,LogoutPageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
   RouterModule.forChild(AUTH_ROUTES),
    SharedModule
  ],
  exports: [],
  providers: [
  ],
})
export class AuthModule {
  constructor() {
  }
}
