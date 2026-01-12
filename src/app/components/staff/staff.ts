import { Component, OnInit, signal } from '@angular/core';
import { StaffModel } from '../../shared/models/staff.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../shared/services/staff.service';
import { inject } from '@angular/core';
import { StaffList } from './staff-list/staff-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-staff',
  imports: [StaffList],
  templateUrl: './staff.html',
  styleUrl: './staff.scss',
})
export class Staff implements OnInit {
  protected staff = signal<StaffModel[]>([]);
  private subscriptions: Subscription[] = [];
  protected section = signal('');
  private activatedRoute = inject(ActivatedRoute);
  protected breadcrumb = signal('');

  constructor(private staffService: StaffService) {
    console.log('dans le staffservice constructor');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.staffService.getAllProf().subscribe((allProf: StaffModel[]) => {
        this.staff.set(allProf.filter((c) => c.hogwartsStaff === true));
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
// export class Staff {
//   private staffService = inject(StaffService);
//   protected staff = toSignal(this.staffService.getAllProf(), { initialValue: [] });
//   protected staffRessource = httpResource(() => environment.baseUrl + '/characters/staff');
// }
