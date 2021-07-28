import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() {
  }

  alert(message: any, type: any): any {
    const Toast = Swal.mixin({
      position: 'center',
      showConfirmButton: false,
      showCloseButton: true,
    });

    Toast.fire({
      icon: type,
      title: message
    });
  }
}
