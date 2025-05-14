export interface Product {
  data?: any;
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: string;
  categoryName: string;
  imageUrl: string;
}

export interface ProductResponse {
  isSuccess: boolean;
  data: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    items: Product[];
  };
}
export interface ApiResponse {
  isSuccess: boolean;
  data: Product;
}
export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}
export interface LoginUser{
  email: string;
  password: string;
}
export interface orderId{
  orderId : number
}

export interface Category {
  id: number;
  name: string;
}
export interface CategoryResponse {
  isSuccess: boolean;
  data: Category[];
}

export interface OrderItem {
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
  imageUrl: string;
}
export interface UserOrder {
  items: OrderItem[];
}
