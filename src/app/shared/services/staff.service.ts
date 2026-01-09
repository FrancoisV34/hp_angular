import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StaffModel } from '../models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private httpClient = inject(HttpClient);

  getAllProf(): Observable<StaffModel[]> {
    return this.httpClient.get<StaffModel[]>(environment.baseUrl + '/characters/staff');
  }
}
