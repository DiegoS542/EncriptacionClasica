import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EncriptacionService } from './encriptacion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Encriptacion';

  // [SEC-CTRL-101]
  alfabeto: string =
    'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789 ';
  metodoSeleccionado: string = 'cesar';
  modoOperacion: string = 'cifrar';
  desplazamiento: number = 3;

  mensajeEntrada: string = '';
  mensajeSalida: string = '';

  // [SEC-CTRL-102]
  constructor(private encriptacionService: EncriptacionService) {}

  procesarMensaje() {
    // [SEC-CTRL-103]
    let descifrar = this.modoOperacion === 'descifrar';

    // [SEC-CTRL-104]
    if (this.metodoSeleccionado === 'cesar') {
      this.mensajeSalida = this.encriptacionService.cesar(
        this.mensajeEntrada,
        this.alfabeto,
        this.desplazamiento,
        descifrar,
      );
    } else {
      this.mensajeSalida = this.encriptacionService.atbash(
        this.mensajeEntrada,
        this.alfabeto,
      );
    }
  }
}
