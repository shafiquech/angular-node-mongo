import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'courses/add/:id',
        component: CourseCreateComponent
    },
    {
        path: 'courses/:id',
        component: CourseDetailsComponent
    },
    {
        path: 'courses',
        component: CourseListComponent
    }

];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
