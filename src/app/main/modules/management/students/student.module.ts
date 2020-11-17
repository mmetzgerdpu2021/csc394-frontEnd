import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { StudentRoutingModule} from './student-routing.module';
import {SharedModule} from '../../../../shared/shared.module';



/**
 * Module pour reprise commandes
 * @author: zmorhir
 */
@NgModule({
  imports: [
    StudentRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  declarations: [],
  providers: []
})
export class StudentModule {
}
