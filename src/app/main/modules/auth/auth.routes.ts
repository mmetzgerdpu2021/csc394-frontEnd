
import { LoginPageComponent } from './pages/login/login.component';
import { LogoutPageComponent } from './pages/logout/logout.page';

export const AUTH_ROUTES = [
  {
    path     : 'login',
    component: LoginPageComponent   ,
    canActivate: [],
  },
  {
    path     : 'logout',
    component: LogoutPageComponent   ,
    canDeactivate: []
  },
];
