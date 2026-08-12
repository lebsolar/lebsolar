import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('lebsolar');

  constructor(private router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        window.scrollTo(0, 0);

      }

    });

  }

}