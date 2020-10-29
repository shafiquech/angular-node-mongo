import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courses: any;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    this.courseService.getAllCourses().subscribe(
      data => {
        this.courses = data;
      },
      err => console.error(err),
      () => console.log('Fetch of all the courses is completed... ')
    );
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id)
      .subscribe(
        data => {
          console.log('after delete ' + data);
          this.getCourse();
        },
        error => console.log(error));
  }

  courseDetails(id: string) {
    this.router.navigate(['courses', id]);
  }

  updateCourse(id: string) {
    this.router.navigate(['courses/add', id]);
  }
  createNewcourse() {
    this.router.navigate(['courses/add', 'NA']);
  }

  getRandomImageId() {
    return Math.floor((Math.random() * 3) + 1);
  }

}
