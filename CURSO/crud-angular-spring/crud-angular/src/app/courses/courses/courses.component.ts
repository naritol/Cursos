import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'categoria'];
 // courses: Course[] = [
    //{_id: '1', name: 'Angular', categoria:'Front-end'}
 // ];


  constructor(
    private cousesService: CoursesService,
    public dialog: MatDialog
    ) {
    this.courses$ = this.cousesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar Cursos');
        //console.log(error);
        return of([])
      })

         );
   // this.courses = [];
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });

  }

  ngOnInit(): void {
      
  }

}
