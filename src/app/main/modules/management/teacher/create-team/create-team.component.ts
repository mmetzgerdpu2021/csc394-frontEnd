import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {TeamService} from '../../shared/services/team.service';
import {Team} from '../../../../../shared/models/team.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {ErrorStateMatcher, MatSnackBar, MatTable} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../../../../shared/models/user.model';
import {element} from 'protractor';
import {Goals} from '../../../../../shared/models/goals.model';
import {StdToTeam} from '../../../../../shared/models/std-to-team';
import {removeSuffix} from '@angular/language-service/src/utils';
import {GoalService} from '../../shared/services/goal.service';


@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit{

  /*nameFormControl = new FormControl('', [
    Validators.required
  ]);*/

  @ViewChild('freeUserTable',{static: false}) freeUserTable: MatTable<any>;
  @ViewChild('affectedUserTable', {static: false}) affectedUserTable: MatTable<any>;
  @ViewChild('goalsTable', {static: false}) goalsTable: MatTable<any>;
  private listFreeStudent: Array<User>;
  private listAffectedStudent: Array<User> = [];
  private listGoals: Array<Goals> = [];
  private teamId: number;

  private teamName: string = '';

  displayedUserColumns: string[] = ['first name', 'last name', 'email', 'affect'];

  displayedGoalsColumns: string[] = ['goal title', 'goal description', 'status', 'action'];
  formGoals: FormGroup;

  constructor(private goalService: GoalService, private snackBar: MatSnackBar, private teamService: TeamService, private formBuilder: FormBuilder, private userService: UserService, private route: Router){

  }

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);




  ngOnInit(): void {
    this.formGoals = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control(''
      )
    });
    this.userService.getAllFreeStudent(false).subscribe(data => {
      this.listFreeStudent = data;
    });
  }

  saveTeamName(){
    let team: Team = {
      teamName: this.teamName,
      userId: JSON.parse(sessionStorage.getItem('userLoggedId'))
    };
    this.teamService.saveTeam(team).subscribe(result => {
      this.teamId = result.teamId;
      this.snackBar.open('Saved with success', '', {
        duration: 1000
      });
    });
  }

  deleteUserFromTeam(element) {
    let stdToTeam: StdToTeam = {
      teamId: this.teamId ,
      listUserId: [element.id]
    };
    this.userService.deleteStudentFrom(stdToTeam).subscribe(result => {
      this.listAffectedStudent.splice(this.listAffectedStudent.indexOf(element), 1);
      element.selected = false;
      this.listFreeStudent.push(element);

      this.affectedUserTable.renderRows();
      this.freeUserTable.renderRows();
    });

  }

  addUserToTeam(element) {
    let stdToTeam: StdToTeam = {
      teamId: this.teamId ,
      listUserId: [element.id]
    };
    this.userService.addStudentToTeam(stdToTeam).subscribe(result => {
      this.listFreeStudent.splice(this.listFreeStudent.indexOf(element), 1);
      this.listAffectedStudent.push(element);
      console.log(this)
      this.affectedUserTable.renderRows();
      this.freeUserTable.renderRows();
    });
  }

  addGoal(){
    let goal: Goals = {
      title:this.formGoals.getRawValue().title,
      description: this.formGoals.getRawValue().description,
      status: "To Do",
      teamId: this.teamId
    }
    this.goalService.saveGoal(goal).subscribe(result => {
        this.listGoals.push(result);
        this.goalsTable.renderRows();
        this.formGoals.reset();
        this.snackBar.open('Saved with success', '', {
          duration: 1000
        });
      });
  }

  deleteGoal(element) {
    this.goalService.deleteGoal(element).subscribe(result => {
      this.listGoals.splice(this.listGoals.indexOf(element), 1);
      this.goalsTable.renderRows();
      this.snackBar.open('Deleted with success', '', {
        duration: 1000
      });
    });

  }

  saveGoals() {

  }
}
