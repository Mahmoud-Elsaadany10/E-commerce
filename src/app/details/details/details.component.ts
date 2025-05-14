import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../model/models';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() product: Product | undefined;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {

  }
}
