import { Injectable } from '@angular/core';
import { EncriptacionService } from './encriptacion.service';
import { DICCIONARIO } from './diccionario';


export interface ResultadoCrack {
  textoDescifrado: string;
  metodo: string;
  desplazamiento: number | null;
  puntos: number;
}

@Injectable({
  providedIn: 'root'
})
export class CrackService {
  constructor(private encriptacionService: EncriptacionService) { }

  analizarTexto(textoCifrado: string, alfabeto: string): ResultadoCrack {
    let mejorPuntaje = 0;
    let mejorTexto = '';
    let mejorMetodo = 'Indeterminado';
    let mejorDesplazamiento: number | null = null;

    // 1. PRIMERA RONDA: Evaluar el método Atbash (Solo tiene 1 posible resultado)
    const textoAtbash = this.encriptacionService.atbash(textoCifrado, alfabeto);
    const puntosAtbash = this.evaluarTexto(textoAtbash);

    if (puntosAtbash > mejorPuntaje) {
      mejorPuntaje = puntosAtbash;
      mejorTexto = textoAtbash;
      mejorMetodo = 'atbash';
      mejorDesplazamiento = null; // Atbash no usa desplazamiento numérico
    }

    // 2. SEGUNDA RONDA: Fuerza Bruta al método César (N-1 iteraciones)
    // Empezamos en 1 porque un desplazamiento de 0 es el mismo texto cifrado
    for (let i = 1; i < alfabeto.length; i++) {
      // Usamos 'true' porque estamos forzando el descifrado
      const textoCesar = this.encriptacionService.cesar(textoCifrado, alfabeto, i, true);
      const puntosCesar = this.evaluarTexto(textoCesar);

      if (puntosCesar > mejorPuntaje) {
        mejorPuntaje = puntosCesar;
        mejorTexto = textoCesar;
        mejorMetodo = 'cesar';
        mejorDesplazamiento = i;
      }
    }

    // 3. RETORNO: Devolvemos el ganador absoluto
    return {
      textoDescifrado: mejorTexto,
      metodo: mejorMetodo,
      desplazamiento: mejorDesplazamiento,
      puntos: mejorPuntaje
    };
  }

  // Función privada que actúa como el "Juez"
  private evaluarTexto(texto: string): number {
    let puntos = 0;
    const textoNormalizado = texto.toLowerCase();

    for (const palabra of DICCIONARIO) {
      const palabraNormalizada = palabra.toLowerCase();

      // Truco de rendimiento: Usamos split para contar ocurrencias rápido
      // Si "la" aparece 3 veces, split dividirá el string en 4 partes.
      const ocurrencias = textoNormalizado.split(palabraNormalizada).length - 1;
      puntos += ocurrencias;
    }

    return puntos;
  }
}
