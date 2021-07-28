import {AfterViewInit, OnDestroy, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';


@Component({
  selector: 'app-listward',
  templateUrl: './listward.component.html',
  styles: []
})
export class ListwardComponent implements OnInit, OnDestroy {
  @ViewChild('childModal', {static: false}) childModal: ModalDirective;
  @ViewChild('drugModal', {static: false}) drugModal: ModalDirective;
  @ViewChild(DataTableDirective, {static: false})

  ward = '';
  wardName: any = '';
  wardCode: any = '';
  dataWard: any = [];
  tempWard: any = [];
  dataFavi: any = [];
  txtSearch: any = '';
  xray: any = '';
  boy = 0;
  girl = 0;
  male = 0;
  female = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private api: ApiService, private http: HttpClient, private router: Router) {

  }

  showChildModal(data: any): void {

    if(data === ''){
      this.xray = 'ไม่มีข้อมูล';
    }else{
      this.xray = data.replace(/\n/g, '<br />').replace(/\r/g, '<br />').replace(/�/g, ' ');
    }

    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
  hideDrugModal(): void {
    this.drugModal.hide();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  ngOnInit(): void {
    this.ward = sessionStorage.getItem('ward');
    this.wardName = sessionStorage.getItem('wardName');
    this.wardCode = sessionStorage.getItem('ward');
    this.dtOptions = {

      // pageLength: 10,
      retrieve: false,
      paging: false,
      searching: false,

    };
    // this.getListWard();
    this.http.get(`${environment.URL_API}/hos_ward/${this.ward}/ipd`).subscribe(
      (data: any) => {
        console.log(data);
        if (data.ok) {
          this.dataWard = data.message;
          this.tempWard = data.message;
          console.log(this.dataWard);
          this.dtTrigger.next();
          this.dataWard.forEach((value: any) => {
            if (parseInt(value.age_y, 10) >= 15) {
              if (parseInt(value.sex, 10) === 1) {
                this.male = this.male + 1;
              } else {
                this.female = this.female + 1;
              }
            } else {
              if (parseInt(value.sex, 10) === 1) {
                this.boy = this.boy + 1;
              } else {
                this.girl = this.girl + 1;
              }
            }
          });
        }
      }
    );
    // this.dtTrigger.next();
  }

  async getListWard(): Promise<any> {
    const rs: any = await this.api.getIPD(this.ward);
    console.log(rs);
    if (rs.ok) {
      this.dataWard = rs.message;
      this.tempWard = rs.message;
      this.dataWard.forEach((value: any) => {
        if (this.dataWard.age_y >= 15) {
          if (this.dataWard.sex === 1) {
            this.male = this.male + 1;
          } else {
            this.female = this.female + 1;
          }
        } else {
          if (this.dataWard.sex === 1) {
            this.boy = this.boy + 1;
          } else {
            this.girl = this.girl + 1;
          }
        }
      });
      // this.dtTrigger.next();
    } else {

    }
  }

  search(): any {
    if (this.txtSearch === '') {
      this.dataWard = this.tempWard;
    } else {
      this.dataWard = this.tempWard.filter((data: any) => {
        return data.cid.match(this.txtSearch);
      });
    }
  }

  async getFavidate(an: any): Promise<any> {
    const rs: any = await this.api.getDrugFavi(an);
    this.dataFavi = [];
    this.drugModal.show();
    console.log(rs);
    if (rs.ok) {
      this.dataFavi = rs.message;
    }else{
      this.dataFavi = [];
    }

  }


  back(): any {
    this.router.navigateByUrl('/apps');
  }
}
