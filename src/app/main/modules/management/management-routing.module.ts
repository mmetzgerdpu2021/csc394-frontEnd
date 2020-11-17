import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {path: 'teacher',
        loadChildren: () => import('src/app/main/modules/management/teacher/teacher.module').then(m => m.TeacherModule)},
    {path: 'student',
      loadChildren: () => import('src/app/main/modules/management/students/student.module').then(m => m.StudentModule)}
    ])],
  exports: [RouterModule]

})
export class ManagementRoutingModule { }
