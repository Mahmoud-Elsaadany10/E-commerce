import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule,NgbToastModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  constructor( public toastService: SharedService){

  }
  closeToast() {
    this.toastService.showToast = false;
  }
}
