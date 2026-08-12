import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  constructor(private title: Title) {
    this.title.setTitle('PROYECTOS | LebSolar Ingeniería');
  }

  proyectos = [
    { titulo: 'Sistema On-Grid 15 kWp', ubicacion: '', imagen: 'assets/images/projects/Arroyalito.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 22,6 kWp', ubicacion: '', imagen: 'assets/images/projects/Dappa.jpeg', alt: '' },
    { titulo: 'Sistema Off-Grid', ubicacion: 'Food Truck', imagen: 'assets/images/projects/FoodTruck.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 2,4 kWp', ubicacion: 'Jamundí, Valle del Cauca', imagen: 'assets/images/projects/Jamundi2,4.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 9,9 kWp', ubicacion: '', imagen: 'assets/images/projects/Nissi.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 22,5 kWp', ubicacion: '', imagen: 'assets/images/projects/Rinconada.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 10,2 kWp', ubicacion: '', imagen: 'assets/images/projects/Rozo.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 4 kWp', ubicacion: '', imagen: 'assets/images/projects/SantaTeresita.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 15,1 kWp', ubicacion: '', imagen: 'assets/images/projects/Sumintransporte.jpeg', alt: '' },
    { titulo: 'Sistema On-Grid 7,4 kWp', ubicacion: 'Tulúa, Valle del Cauca', imagen: 'assets/images/projects/Tulua7,4.jpeg', alt: '' }
  ];

}