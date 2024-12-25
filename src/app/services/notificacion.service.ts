import { Injectable } from '@angular/core';
import Toastify from 'toastify-js'


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }

  notificacionDeError(err: any) {
    let msg="Error verifique con administración."
    if(err?.status !== 0) {
      msg = err?.error?.message
    } else {
      msg="No hay respuesta del servidor."
    }

    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #f50000, #ff5b14)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }

  notificacionDeExito(msg: string) {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right,  #0c8a02, #16ff03)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }
}
