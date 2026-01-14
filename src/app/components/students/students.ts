import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentsList } from './students-list/students-list';
import { StudentsModel } from '../../shared/models/students.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../shared/services/student-service';

@Component({
  selector: 'app-students',
  imports: [StudentsList],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students implements OnInit {
  protected students = signal<StudentsModel[]>([]);
  protected section = signal('');
  protected breadcrumb = signal('');
  protected subscriptions: Subscription[] = [];
  private activatedRoute = inject(ActivatedRoute);

  constructor(private studentService: StudentsService) {
    console.log('dans le students constructor');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.studentService.getAllStudents().subscribe((allStudents: StudentsModel[]) => {
        this.students.set(allStudents.filter((c) => c.hogwartsStudent === true));
      })
    );
    this.getActivatedRouteData();
  }
  private getActivatedRouteData(): void {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.section.set(data['section']);
        this.breadcrumb.set(data['breadcrumb']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
