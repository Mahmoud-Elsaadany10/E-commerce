import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegServeService } from '../service/reg-serve.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  @Input() title: string = "";
  @Input() message: string = "";

  constructor(public activeModal: NgbActiveModal,

    private logoutserve :RegServeService
  ) {}

  confirm() {
    this.activeModal.close(true);
    this.logoutserve.logout()
  }

  cancel() {
    this.activeModal.dismiss(false);
  }

}
