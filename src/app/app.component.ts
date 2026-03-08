import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EncriptacionService } from './encriptacion.service';
import { CrackService } from './crack.service';

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

  metodoDetectado: string | null = null;
  desplazamientoDetectado: number | null = null;
  puntosConfianza: number = 0;

  // [SEC-CTRL-102]
  constructor(private encriptacionService: EncriptacionService, private crackService: CrackService) {}

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

  crack() {
    if (!this.mensajeEntrada.trim()) {
      return;
    }

    // 2. Limpieza de estado de intentos anteriores
    this.metodoDetectado = null;
    this.desplazamientoDetectado = null;
    this.puntosConfianza = 0;
    this.mensajeSalida = 'Iniciando criptoanálisis...';

    // 3. Ejecución del ataque (Delega el trabajo pesado al servicio)
    // Se espera que el servicio devuelva un objeto con la estructura del resultado
    const resultado = this.crackService.analizarTexto(
      this.mensajeEntrada,
      this.alfabeto,
    );

    // 4. Evaluación del veredicto y actualización de la UI
    if (resultado && resultado.puntos > 0) {
      this.mensajeSalida = resultado.textoDescifrado;
      this.metodoDetectado = resultado.metodo;
      this.desplazamientoDetectado = resultado.desplazamiento;
      this.puntosConfianza = resultado.puntos;
    } else {
      this.mensajeSalida =
        '⚠️ No se pudo romper el cifrado.';
      this.metodoDetectado = 'Indeterminado';
    }
  }
}
