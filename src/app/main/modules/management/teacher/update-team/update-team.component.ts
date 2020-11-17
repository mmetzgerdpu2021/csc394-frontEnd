import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {TeamService} from '../../shared/services/team.service';
import {Team} from '../../../../../shared/models/team.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher, MatDialog, MatSnackBar, MatTable} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../../../../shared/models/user.model';
import {element} from 'protractor';
import {Goals} from '../../../../../shared/models/goals.model';
import {GoalService} from '../../shared/services/goal.service';
import {StarRatingColor} from '../component/star-rating/star-rating.component';
import {RatingService} from '../../shared/services/rating.service';
import {Rate} from '../../../../../shared/models/rate.model';
import {isNullOrUndefined} from 'util';
import {DialogChangeStatus} from '../component/dialog/DialogChangeStatus';
import {StdToTeam} from '../../../../../shared/models/std-to-team';


@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit{

  avgOfRates: number = 0;
  rating:number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  /*nameFormControl = new FormControl('', [
    Validators.required
  ]);*/

  @ViewChild('freeUserTable',{static: false}) freeUserTable: MatTable<any>;
  @ViewChild('affectedUserTable', {static: false}) affectedUserTable: MatTable<any>;
  @ViewChild('goalsTable', {static: false}) goalsTable: MatTable<any>;
  private listFreeStudent: Array<User>;
  private listAffectedStudent: Array<User> = [];
  private listGoals: Array<Goals> = [];
  private listRate: Array<Rate> = [];

  displayedUserColumns: string[] = ['first name', 'last name', 'email', 'affect'];

  displayedGoalsColumns: string[] = ['goal title', 'goal description', 'status', 'action'];
  listNumberOfRateByLevel: Array<number> = [0,0,0,0,0];

  formGoals: FormGroup;
  formTeam: FormGroup;
  formRate: FormGroup;
  teamId: number;
  userLogger: number;
  private currentUserRate: Rate;

  constructor(private rateService: RatingService, private snackBar: MatSnackBar, private goalService: GoalService,private teamService: TeamService,
              private formBuilder: FormBuilder, private userService: UserService,
              private route: Router,private activetedRoute: ActivatedRoute, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.userLogger = JSON.parse(sessionStorage.getItem('userLoggedId'));
    this.formGoals = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control(''
      )
    });
    this.formTeam = this.formBuilder.group({
      teamName: this.formBuilder.control('', [Validators.required])
    });
    this.formRate = this.formBuilder.group({
      comment: this.formBuilder.control('')
    });
    this.activetedRoute.params.subscribe( params =>{
      this.teamId = params['id'];
      this.teamService.getTeamById(this.teamId, false).subscribe(team => {
        //console.log(team);
        this.formTeam.get('teamName').setValue(team.teamName);
      });
      this.userService.getStudentByTeamId(this.teamId, false).subscribe(users => {
        this.listAffectedStudent = users;
      });
      this.goalService.getGoalsByTeamId(this.teamId,false).subscribe(goals => {
        this.listGoals = goals;
      });
      this.rateService.getRatesByTeamId(this.teamId, false).subscribe(rates => {
        console.log(rates);
        this.listRate = rates;
        this.setMyRating();
        this.getElementForResumeRate();
      });
    });
    this.userService.getAllFreeStudent(false).subscribe(data => {
      this.listFreeStudent = data;

    });
  }

  getElementForResumeRate() {
    this.avgOfRates = 0;
    this.listNumberOfRateByLevel = [0,0,0,0,0]
    this.listRate.forEach(element => {
      this.avgOfRates = this.avgOfRates + element.rating;
        switch (element.rating){
          case 1 : {
            this.listNumberOfRateByLevel[0] = this.listNumberOfRateByLevel[0] + 1;
            break;}
          case 2 : {
            this.listNumberOfRateByLevel[1] = this.listNumberOfRateByLevel[1] + 1;
            break;}
          case 3 : {
            this.listNumberOfRateByLevel[2] = this.listNumberOfRateByLevel[2] + 1;
            break;}
          case 4 : {
            this.listNumberOfRateByLevel[3] = this.listNumberOfRateByLevel[3] + 1;
            break;}
          case 5 : {
            this.listNumberOfRateByLevel[4] = this.listNumberOfRateByLevel[4] + 1;
            break;}
        }

      });
    if (this.listRate.length > 1){
      this.avgOfRates = this.avgOfRates / this.listRate.length;
    }
  }

  saveTeamName(){
    console.log(this.teamId);
    let team: Team = {
      teamId: this.teamId,
      teamName: this.formTeam.get('teamName').value,
      userId: JSON.parse(sessionStorage.getItem('userLoggedId'))
    };
    this.teamService.saveTeam(team).subscribe(result => {
      this.teamId = result.teamId;
      this.snackBar.open('Saved with success', '', {
        duration: 1000
      });
    });
  }

  setMyRating(){
    const myReview = this.listRate.find(element => element.userId === this.userLogger);
    if (!isNullOrUndefined(myReview)) {
      this.currentUserRate = myReview;
      this.rating = myReview.rating;
      this.formRate.get('comment').setValue(myReview.comment);
    }
  }
  onRatingChanged(rating){
    this.rating = rating;
  }

  saveRate() {
    if (isNullOrUndefined(this.currentUserRate)) {
      this.currentUserRate = {
        teamId: this.teamId,
        userId: this.userLogger,
        rating: this.rating,
        comment: this.formRate.get('comment').value
      };
    } else {
      this.currentUserRate.rating = this.rating;
      this.currentUserRate.comment = this.formRate.get('comment').value;
    }

    console.log(this.currentUserRate)
    this.rateService.saveRate(this.currentUserRate).subscribe(result => {
      this.currentUserRate.id = result.id;
      this.currentUserRate.raterFullName = result.raterFullName;
      this.listRate.push(this.currentUserRate);
      this.getElementForResumeRate();
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
      this.snackBar.open('Added with success', '', {
        duration: 1000
      });
    });
  }

  addUserToTeam(element) {
    let stdToTeam: StdToTeam = {
      teamId: this.teamId ,
      listUserId: [element.id]
    };
    this.userService.addStudentToTeam(stdToTeam).subscribe(result => {
      this.listFreeStudent.splice(this.listFreeStudent.indexOf(element), 1);
      element.selected = false;
      this.listAffectedStudent.push(element);
      this.affectedUserTable.renderRows();
      this.freeUserTable.renderRows();
      this.snackBar.open('Added with success', '', {
        duration: 1000
      });

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
    console.log(element.id);
    this.goalService.deleteGoal(element).subscribe(result => {
      this.listGoals.splice(this.listGoals.indexOf(element), 1);
      this.goalsTable.renderRows();
      this.snackBar.open('Deleted with success', '', {
        duration: 1000
      });
    });

  }



  changeStatus(element): void {
    const dialogRef = this.dialog.open(DialogChangeStatus, {
      width: '250px',
      data: {actualStaus: element.status, changedStatus: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      element.status = result;
     this.goalService.saveGoal(element).subscribe(result => {
       this.snackBar.open('Chaged with success', '', {
         duration: 1000
       });
     });
    });
    this.goalsTable.renderRows();
  }
}
