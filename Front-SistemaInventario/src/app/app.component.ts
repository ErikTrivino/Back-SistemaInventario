import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./componentes/footer/footer.component";
import { HeaderComponent } from "./componentes/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistemaInventarioo';
}
