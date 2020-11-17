import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {SharedModule} from '../../../../shared/shared.module';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ListeTeamComponent} from './list-team/liste-team.component';
import {CreateTeamComponent} from './create-team/create-team.component';
import {UpdateTeamComponent} from './update-team/update-team.component';
import {StarRatingComponent} from './component/star-rating/star-rating.component';
import {DialogChangeStatus} from './component/dialog/DialogChangeStatus';


@NgModule({
  imports: [
    TeacherRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule
  ],
  declarations: [ListeTeamComponent, CreateTeamComponent, UpdateTeamComponent, StarRatingComponent, DialogChangeStatus],
  providers: [],
  entryComponents:[DialogChangeStatus]
})
export class TeacherModule {
}
