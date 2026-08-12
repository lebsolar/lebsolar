import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  @ViewChild('projectsCarousel')
  projectsCarousel!: ElementRef<HTMLDivElement>;

  @ViewChild('projectsWindow')
  projectsWindow!: ElementRef<HTMLDivElement>;

  constructor(private title: Title) {
    this.title.setTitle('INICIO | LebSolar Ingeniería');
  }

  proyectosBase = [
    {
      imagen: 'assets/images/projects/Arroyalito.jpeg',
      alt: 'Proyecto solar Arroyalito'
    },
    {
      imagen: 'assets/images/projects/Dappa.jpeg',
      alt: 'Proyecto solar Dappa'
    },
    {
      imagen: 'assets/images/projects/FoodTruck.jpeg',
      alt: 'Proyecto solar Food Truck'
    },
    {
      imagen: 'assets/images/projects/Jamundi2,4.jpeg',
      alt: 'Proyecto solar Jamundí'
    },
    {
      imagen: 'assets/images/projects/Nissi.jpeg',
      alt: 'Proyecto solar Nissi'
    },
    {
      imagen: 'assets/images/projects/Rinconada.jpeg',
      alt: 'Proyecto solar Rinconada'
    },
    {
      imagen: 'assets/images/projects/Rozo.jpeg',
      alt: 'Proyecto solar Rozo'
    },
    {
      imagen: 'assets/images/projects/SantaTeresita.jpeg',
      alt: 'Proyecto solar Santa Teresita'
    },
    {
      imagen: 'assets/images/projects/Sumintransporte.jpeg',
      alt: 'Proyecto solar Sumintransporte'
    },
    {
      imagen: 'assets/images/projects/Tulua7,4.jpeg',
      alt: 'Proyecto solar Tuluá'
    }
  ];

  // Se cargan desde el inicio, no después.
  proyectos = [
    ...this.proyectosBase,
    ...this.proyectosBase,
    ...this.proyectosBase
  ];

  tarjetasVisibles = 1;

  indiceActual = this.proyectosBase.length;

  moviendo = false;

  private readonly anchoTarjeta = 400;
  private readonly espacio = 14;
  private readonly duracion = 450;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.configurarCarruselInicial();
    });
  }

  @HostListener('window:resize')
  onResize(): void {

    if (this.moviendo) {
      return;
    }

    this.configurarCarruselInicial();
  }

  private configurarCarruselInicial(): void {

    if (!this.projectsCarousel || !this.projectsWindow) {
      return;
    }

    const disponible =
      this.projectsCarousel.nativeElement.clientWidth;

    this.tarjetasVisibles = Math.max(
      1,
      Math.floor(
        (disponible + this.espacio) /
        (this.anchoTarjeta + this.espacio)
      )
    );

    this.tarjetasVisibles = Math.min(
      this.tarjetasVisibles,
      this.proyectosBase.length
    );

    const anchoVentana =
      (
        this.tarjetasVisibles *
        this.anchoTarjeta
      ) +
      (
        (this.tarjetasVisibles - 1) *
        this.espacio
      );

    this.projectsWindow.nativeElement.style.width =
      `${anchoVentana}px`;

    this.indiceActual =
      this.proyectosBase.length;

    this.projectsWindow.nativeElement.scrollLeft =
      this.indiceActual *
      (this.anchoTarjeta + this.espacio);
  }

  moverProyecto(direccion: number): void {

    if (this.moviendo) {
      return;
    }

    this.moviendo = true;

    const nuevoIndice =
      this.indiceActual + direccion;

    const destino =
      nuevoIndice *
      (this.anchoTarjeta + this.espacio);

    this.animarScroll(
      destino,
      () => {

        const total =
          this.proyectosBase.length;

        if (nuevoIndice < total) {

          this.indiceActual =
            nuevoIndice + total;

          this.saltarSinAnimacion();

        } else if (
          nuevoIndice >=
          total * 2
        ) {

          this.indiceActual =
            nuevoIndice - total;

          this.saltarSinAnimacion();

        } else {

          this.indiceActual =
            nuevoIndice;
        }

        this.moviendo = false;
      }
    );
  }

  private animarScroll(
    destino: number,
    terminado: () => void
  ): void {

    const ventana =
      this.projectsWindow.nativeElement;

    const inicio =
      ventana.scrollLeft;

    const distancia =
      destino - inicio;

    const tiempoInicial =
      performance.now();

    const animar = (tiempoActual: number) => {

      const progreso =
        Math.min(
          1,
          (tiempoActual - tiempoInicial) /
          this.duracion
        );

      const easing =
        progreso < 0.5
          ? 4 * progreso * progreso * progreso
          : 1 -
            Math.pow(
              -2 * progreso + 2,
              3
            ) / 2;

      ventana.scrollLeft =
        inicio +
        distancia * easing;

      if (progreso < 1) {

        requestAnimationFrame(animar);

      } else {

        ventana.scrollLeft =
          destino;

        terminado();
      }
    };

    requestAnimationFrame(animar);
  }

  private saltarSinAnimacion(): void {

    this.projectsWindow.nativeElement.scrollLeft =
      this.indiceActual *
      (this.anchoTarjeta + this.espacio);
  }
}