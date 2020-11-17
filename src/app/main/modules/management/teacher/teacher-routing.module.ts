import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadStaticDataGuards} from '../../../../shared/guards/load-static-data.guard';
import {ListeTeamComponent} from './list-team/liste-team.component';
import {CreateTeamComponent} from './create-team/create-team.component';
import {UpdateTeamComponent} from './update-team/update-team.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ListeTeamComponent},
    {path: 'team/create', component: CreateTeamComponent},
    {path: 'team/:id', component: UpdateTeamComponent}
  ])],
  exports: [RouterModule]

})
export class TeacherRoutingModule { }
