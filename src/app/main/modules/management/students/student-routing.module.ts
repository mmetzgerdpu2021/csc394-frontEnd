import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentListeTeamComponent} from './list-team/student-liste-team.component';
import {UpdateTeamComponent} from '../teacher/update-team/update-team.component';
import {StudentRateTeamComponent} from './student-rate-team/student-rate-team.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: StudentListeTeamComponent},
    {path: 'team/:id', component: StudentRateTeamComponent}
  ])],
  exports: [RouterModule]

})
export class StudentRoutingModule { }
