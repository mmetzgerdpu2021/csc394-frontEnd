import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { StudentRoutingModule} from './student-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {StudentListeTeamComponent} from './list-team/student-liste-team.component';
import {UpdateTeamComponent} from '../teacher/update-team/update-team.component';
import {StarRatingComponent} from '../teacher/component/star-rating/star-rating.component';
import {DialogChangeStatus} from '../teacher/component/dialog/DialogChangeStatus';
import {StudentRateTeamComponent} from './student-rate-team/student-rate-team.component';



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
  declarations: [StudentListeTeamComponent, StudentRateTeamComponent, StarRatingComponent, DialogChangeStatus],
  providers: [],
  entryComponents:[DialogChangeStatus]
})
export class StudentModule {
}
