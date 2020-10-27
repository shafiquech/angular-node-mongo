import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  productForm: FormGroup;
  courseId: string;
  validMessage = '';

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params.id;
    console.log('ID for get details ' + this.courseId);
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      _id: new FormControl()
    });
    this.initForUpdation(this.courseId);
  }

  submitProduct() {
    this.courseService.saveCourse(this.productForm.value).subscribe(
      data => {
        this.productForm.reset();
        this.navigateToList();
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }
  navigateToList() {
    this.router.navigate(['courses']);
  }

  initForUpdation(id: string) {
    if (id && 'NA' !== id) {
      this.courseService.getCourseById(id).subscribe(
        data => {
          // remove the version because it is not gonna be updated.
          delete data['__v'];
          console.log(data);
          this.productForm.setValue(data);
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    }
  }
}
