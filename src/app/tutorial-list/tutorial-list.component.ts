import { Component, OnInit } from '@angular/core';
import { TurorialserviceService } from 'src/app/turorialservice.service';
import { Tutorials} from '../tutorials'

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss']
})
export class TutorialListComponent implements OnInit {

  page = 1;

  handlePageChange(event) {
    this.page = event;
  }


  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TurorialserviceService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
