import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { StudentsModel } from '../../../shared/models/students.model';

export interface RouteData {
  section: string;
  breadcrumb: string;
}

@Component({
  selector: 'app-students-list',
  imports: [CommonModule],
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList {
  students = input.required<StudentsModel[]>();
  data = input.required<RouteData>();
}
