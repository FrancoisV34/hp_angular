import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { StaffModel } from '../../../shared/models/staff.model';

export interface RouteData {
  section: string;
  breadcrumb: string;
}

@Component({
  selector: 'app-staff-list',
  imports: [CommonModule],
  templateUrl: './staff-list.html',
  styleUrl: './staff-list.scss',
})
export class StaffList {
  staff = input.required<StaffModel[]>();
  data = input.required<RouteData>();
}
