import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {TeamService} from '../../shared/services/team.service';
import {Team} from '../../../../../shared/models/team.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {StarRatingColor} from '../component/star-rating/star-rating.component';
import {MatSnackBar, MatTable} from '@angular/material';


@Component({
  selector: 'app-liste-team',
  templateUrl: './liste-team.component.html',
  styleUrls: ['./liste-team.component.css']
})
export class ListeTeamComponent implements OnInit, AfterViewInit{


  selectedTeamId: number;
  loggedUserId: number;
  @ViewChild('listTeamChild', {static: false}) listTeamChild: MatTable<any>;

  ngAfterViewInit(): void {
    this.loggedUserId = JSON.parse(sessionStorage.getItem('userLoggedId'));
    console.log(this.loggedUserId);
    this.teamService.getAllTeamByTeacher(this.loggedUserId,false).subscribe(data => {
      this.data = data;
    });
  }

  private data: Array<Team>;
  displayedColumns: string[] = ['name', 'Nbr of members', 'Nbr of goals', 'action'];


  constructor(private teamService: TeamService, private route: Router, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {

  }


  editTeam(element) {
    this.route.navigateByUrl('management/teacher/team/' + element.teamId);
  }
  AddTeam() {
    this.route.navigateByUrl('management/teacher/team/create');
  }

  deleteTeam(element){

    this.teamService.deleteTeamById(element.teamId).subscribe(result => {
      //console.log(result);
      console.log(this.data.indexOf(element));
      this.data.splice(this.data.indexOf(element),1);
      console.log(this.data);
      this.listTeamChild.renderRows();
      this.snackBar.open('Saved with success', '', {
        duration: 1000
      });
    });
  }

}
