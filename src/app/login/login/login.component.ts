import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SweetalertService} from '../../services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  password: any = '';

  constructor(private router: Router, private sweetalert: SweetalertService) {
  }

  ngOnInit(): void {
  }

  login(): any {
    if (this.password === 'rbh@1476') {
      this.router.navigateByUrl('/apps');
    }else {
      this.sweetalert.alert('รหัสผ่านไม่ถูกต้องค่ะ', 'warning');
    }
  }

}
