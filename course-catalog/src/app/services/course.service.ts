import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllCourses() {
    return this.http.get(this.baseUrl + '/products');
  }

  getCourseById(id: string) {
    return this.http.get(this.baseUrl + '/products/' + id);
  }

  saveCourse(value: any) {
    if (!value._id) {
      return this.http.post(this.baseUrl + '/products', value);
    } else {
      return this.updateCourse(value._id, value);
    }
  }
  updateCourse(id: string, value: any) {
    return this.http.put(this.baseUrl + '/products/' + id, value);
  }
  deleteCourse(id: string) {
    return this.http.delete(this.baseUrl + '/products/' + id);
  }
}
