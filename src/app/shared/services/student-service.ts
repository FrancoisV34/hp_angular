import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { StudentsModel } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private httpClient = inject(HttpClient);

  getAllStudents(): Observable<StudentsModel[]> {
    return this.httpClient.get<StudentsModel[]>(environment.baseUrl + '/characters');
  }
}
