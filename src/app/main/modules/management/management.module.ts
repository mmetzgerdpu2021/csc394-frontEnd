import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ManagementRoutingModule} from './management-routing.module';

import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  imports: [
    ManagementRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  declarations: [],
  providers: []
})
export class ManagementModule {
}
