import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./componentes/footer/footer.component";
import { HeaderComponent } from "./componentes/header/header.component";
import { SidebarComponent } from "./componentes/sidebar/sidebar.component";
import { TokenService } from "./servicios/token.service";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private tokenService: TokenService) {}

  public isLogged(): boolean {
    return this.tokenService.isLogged();
  }
}
