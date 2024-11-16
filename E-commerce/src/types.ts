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
  

  