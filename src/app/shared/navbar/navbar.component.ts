import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegServeService } from '../../registration/service/reg-serve.service';
import { LogoutComponent } from '../../registration/logout/logout.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogged: boolean =true;

  constructor(private _Register: RegServeService
    ,private modalService: NgbModal ,
    private _shared : SharedService
  ){}
    ngOnInit(): void {
    this.islOggedIn()
  }
  islOggedIn(){
    this._Register.userData.subscribe(() =>{
      if(this._Register.userData.getValue() == null){
        this.isLogged = true
      }else{
        this.isLogged = false
      }
    })
  }

    openConfirmModal() {
    const modalRef = this.modalService.open(LogoutComponent, {   windowClass: 'medium-top-modal',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.message = "Are you sure you want to Log out?";

  }
}
