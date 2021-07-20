import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { graphic } from 'echarts';
import { Observable } from 'rxjs';
import { AuthService } from '../../../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../../service/user/user.service'
import { Activity } from '../../../models/activity';
import { Spent } from '../../../models/spent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HttpClient]
})

export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) { }


  public activities: Activity[] = [];

  private spentFromUser: Spent[] = this.authService.currentUser()?.usuSpent;


  ngOnInit(): void {
    this.calculateActivity();
  }

  getThisMonth(): number {
    return this.activities[0]?.actValue;
  }

  getLastMonth(): number {
    return this.activities[1]?.actValue;
  }

  getTotal(): number {
    let total = 0
    this.activities.forEach(element => {
      total += element.actValue;
    });
    return total;
  }

  getBalance() {
    return this.percent(this.getLastMonth(), this.getThisMonth());
  }

  percent(inicial: number, final: number) {
    return (final - inicial) / final * 100.0;
  }

  public calculateActivity() {

    this.activities = [];

    let all = 0, per = 0;

    this.spentFromUser.forEach(spent => {

      let activity = {} as Activity;

      activity.actMonth = spent.sptMonth;
      activity.actValue = this.sumSpent(spent);

      if (per == 0) {
        activity.actPercent = 0;
      } else {
        activity.actPercent = -this.percent(activity.actValue, (all / per));
      }

      all += activity.actValue;

      this.activities.push(activity);
      per++;
    });

    this.activities.reverse();
  }

  public sumSpent(spent: Spent) {
    let total = 0;
    if (spent?.sptItems != null) {
      spent.sptItems.forEach(item => {
        total += item.ispValue;
      });
    }
    return total;
  }

}