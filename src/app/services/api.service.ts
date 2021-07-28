import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getWardCovid(): any {
    return this.http.get(`${environment.URL_API}/hos_ward/covid`).toPromise();
  }

  getIPD(ward): any {
    return this.http.get(`${environment.URL_API}/hos_ward/${ward}/ipd`).toPromise();
  }
  getCountCovid(): any{
    return this.http.get(`${environment.URL_API}/hos_ward/countcovid`).toPromise();
  }

  getDrugFavi(an: any): any{
    return this.http.get(`${environment.URL_API}/hos_ward/${an}/favidate`).toPromise();
  }
}
