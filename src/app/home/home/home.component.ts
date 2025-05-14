import { Component, OnInit } from '@angular/core';
import { Category, Product, ProductResponse } from '../../model/models';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/products.service';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../cart/service/cart.service';
import { DetailsComponent } from '../../details/details/details.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { SharedService } from '../../shared/service/shared.service';
import { RegServeService } from '../../registration/service/reg-serve.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FooterComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 9;
  dynamicMaxSize: number = 5;
  totalPages: number = 0;

  minPrice: number = 0;
  maxPrice: number = 0;
  sortBy: string = 'name';
  sortDirection: string = 'asc';
  selectedCategory: string = '';
  categories: Category[] = [];
  searchName: string = '';
  hide : boolean =false

  constructor(
    private _PrdService: ProductService,
    private modalService: NgbModal,
    private _cart: CartService,
    private _shared: SharedService,
    private _check: RegServeService
  ) {}

  ngOnInit(): void {
    this.getAllPrd();
    this.hide=true
    this.getCatogry();
  }

  getAllPrd() {
    this._PrdService.getAllProducts(this.page).subscribe({
      next: (res) => {
        this.products = res.data.items;
        this.totalPages = res.data.totalCount;
      },
      error: (err) => console.log(err)
    });
  }

  getCatogry() {
    this._PrdService.getCategory().subscribe({
      next: (res) => this.categories = res.data,
      error: (err) => console.log(err)
    });
  }

  scrollToTop() {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }

  showDetails(id: number) {
    this._PrdService.getProductById(id).subscribe({
      next: (res) => {
        const modalRef = this.modalService.open(DetailsComponent, {
          centered: true,
          size: 'md'
        });
        modalRef.componentInstance.product = res.data;
      },
      error: (err) => console.log(err)
    });
  }

  sendData(id: number) {
    if (this._check.userData.getValue() == null) {
      this._shared.show("You have to login first", "light");
    } else {
      this._cart.sendToCart(1, id).subscribe({
        next: () => this._shared.show("Added to cart", "light"),
        error: (err) => console.log(err)
      });
    }
  }

  applyFilter() {
    this.searchName = '';
    this._PrdService.getFilteredProducts(
      this.page,
      this.minPrice,
      this.maxPrice,
      this.sortBy,
      this.sortDirection,
      this.selectedCategory
    ).subscribe({
      next: (res) => {
        this.products = res.data.items;
        this.totalPages = res.data.totalCount;
        this.scrollToTop();
      },
      error: (err) => console.log(err)
    });
  }

  resetFilter() {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.sortBy = 'name';
    this.sortDirection = 'asc';
    this.selectedCategory = '';
    this.searchName = '';
    this.applyFilter();
  }

  searchProducts() {
    if (this.searchName.trim() === '') {
      this.getAllPrd();
      return;
    }

    this._PrdService.searchByName(this.searchName, this.page).subscribe({
      next: (res) => {
        if(res.data.items){
          this.products = res.data.items;
          this.totalPages = res.data.totalCount;
          this.hide=false;
        } else {
          this.products = [];
          this.totalPages = 0;
          this.hide=true;
        }
        // this.scrollToTop();

      },
      error: (err) => {
        if (err.status === 404) {
          this.products = [];
          this.totalPages = 0;
          this.hide=false
        }
        console.log(err)}
    });
  }
  onClickButton(){
    this.getAllPrd()
    this.page=1
    this.searchName=''
    this.hide=true
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.scrollToTop();

    if (this.searchName.trim() !== '') {
      this.searchProducts();
    } else {
      this.applyFilter();
    }
  }

}
