export interface Category {
  name: string;
  subcategories: string[];
}

export interface CategoryNode {
  name: string;
  subcategories: CategoryNode[]; 
}


export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

export type Product = {
    id: number;             
    name: string;           
    price: number;          
    description: string;   
    image: string;          
  };
  
  interface CartItem {
    id: number;
    name: string;
    quantity: number;
  }
  
  interface Invoice {
    id: string;
    date: Date;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    status: 'pending' | 'processing' | 'completed';
  }
  