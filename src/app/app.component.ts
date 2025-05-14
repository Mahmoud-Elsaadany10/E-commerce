import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ToasterComponent } from "./shared/toaster/toaster.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToasterComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';
}
