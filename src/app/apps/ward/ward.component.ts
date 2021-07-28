import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styles: []
})
export class WardComponent implements OnInit {

  dataWard: any = [];
  countQty = 0;
  boy = 0;
  girl = 0;
  male = 0;
  female = 0;
  all = 0;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCovidWard();
    this.getCountCovid();
  }

  async getCovidWard(): Promise<any> {
    const rs: any = await this.api.getWardCovid();
    console.log(rs);
    if (rs.ok) {
      this.dataWard = rs.message;
    } else {
      this.dataWard = [];
    }

    this.dataWard.forEach((value: any) => {
      this.countQty = this.countQty + value.qty;
    });

  }

  async gotoList(ward, wardName): Promise<any> {
    await sessionStorage.setItem('ward', ward);
    await sessionStorage.setItem('wardName', wardName);
    this.router.navigateByUrl('/listward');
  }
  async getCountCovid(): Promise<any> {
    const rs: any = await this.api.getCountCovid();
    if (rs.ok) {
      this.boy = rs.message.boy;
      this.girl = rs.message.girl;
      this.male = rs.message.male;
      this.female = rs.message.female;
      this.all = rs.message.all;
    } else {

    }


  }

}
