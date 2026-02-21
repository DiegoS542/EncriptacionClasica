import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncriptacionService {

  constructor() {}

  cesar(entrada: string, alfabeto: string, desplazamiento: number, descifrar: boolean): string {
    // [SEC-OP-201]
    let resultado = '';

    for(let i = 0; i < entrada.length; i++) {
      let caracter = entrada[i];
      // [SEC-OP-202]
      let posicion = alfabeto.indexOf(caracter);

      if (posicion === -1) {
        // [SEC-OP-203]
        resultado += caracter;
        continue;
      }

      let nuevoIndice: number;
      // [SEC-OP-204]
      if (descifrar) {
        nuevoIndice = (posicion - desplazamiento) % alfabeto.length;
      } else {
        nuevoIndice = (posicion + desplazamiento) % alfabeto.length;
      }

      // [SEC-OP-205]
      if (nuevoIndice < 0) nuevoIndice += alfabeto.length;

      // [SEC-OP-206]
      caracter = alfabeto[nuevoIndice];
      resultado += caracter;
    }
    return resultado;
  }

  atbash(entrada: string, alfabeto: string): string {

    let resultado = '';

    for(let i = 0; i < entrada.length; i++) {
      let caracter = entrada[i];
      let posicion = alfabeto.indexOf(caracter);

      if (posicion != -1) {
        // [SEC-OP-207]
        let nuevoIndice = alfabeto.length - 1 - posicion;
        caracter = alfabeto[nuevoIndice];
      }
      resultado += caracter;
    }
    return resultado;
  }
}
