export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Shop {
  id: string;
  name: string;
  ownerId: string;
  category: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  description: string;
  openingTime: string;
  closingTime: string;
  deliveryAvailable: boolean;
  image: string;
  rating: number;
  isOpen: boolean;
  distance: number;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  image: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerId: string;
  shopId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  date: string;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
}

