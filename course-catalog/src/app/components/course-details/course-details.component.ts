import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  public course: any;

  constructor(private courseService: CourseService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCourseById(this.route.snapshot.params.id);
  }

  getCourseById(id: string) {
    this.courseService.getCourseById(id).subscribe(
      data => {
        this.course = data;
      },
      err => console.error(err),
      () => console.log('got 1 course.. ')
    );
  }
  createNewcourse() {
    this.router.navigate(['courses/add', 'NA']);
  }

}
