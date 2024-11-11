import ShoesKid1 from '../assets/Prodcuts/Kids/Shoes/shoes1.jpg';
import TShirtKid1 from '../assets/Prodcuts/Kids/TShirt/tshirt1.jpg';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    subcategory: string;
  }

const getProductById = (id: number): Product | undefined => {
    return productCatalog.find(product => product.id === id);
};

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
}

export const productCatalog: Product[] = [
    // Kids
    {
      id: 1,
      name: "Kid's Basic T-Shirt",
      price: 19.99,
      description: "Comfortable cotton t-shirt for children",
      image: TShirtKid1,
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 2,
      name: "Kid's Graphic T-Shirt",
      price: 24.99,
      description: "Fun graphic t-shirt with cartoon prints",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 3,
      name: "Kid's Jeans",
      price: 29.99,
      description: "Durable denim jeans for active kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 4,
      name: "Kid's Jeans-Pro",
      price: 39.99,
      description: "Durable denim jeans for active kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 20,
      name: "Air Jordan-mini",
      price: 59.99,
      description: "Durable denim jeans for active kids",
      image: ShoesKid1,
      category: "Kids",
      subcategory: "Shoes"
    },
    
    // Men
    {
      id: 5,
      name: "Men's Classic T-Shirt",
      price: 24.99,
      description: "Classic fit cotton t-shirt for men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 6,
      name: "Men's Shoes",
      price: 64.99,
      description: "comfortable shoes for men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
  
    {
      id: 7,
      name: "Men's Classic Pants",
      price: 54.99,
      description: "classic pants for men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 8,
      name: "Men's Colonies",
      price: 39.99,
      description: "fragrances for men",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 9,
      name: "Men's Coats",
      price: 79.99,
      description: "delicate cotton coats",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    // Women
    {
      id: 10,
      name: "Women's Fashion T-Shirt",
      price: 29.99,
      description: "Trendy and comfortable women's t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 11,
      name: "Women's Shoes",
      price: 89.99,
      description: "elegant shoes for women",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 12,
      name: "Women's Skinny Jeans",
      price: 54.99,
      description: "Stylish high-waisted skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 13,
      name: "Women's Colonies",
      price: 54.99,
      description: "delicate fragrance for women",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 14,
      name: "Women's Coats",
      price: 54.99,
      description: "Faux fur coats for women",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
  
    
    //Unisex
    {
      id: 15,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "classic cotton t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 16,
      name: "Unisex Shoes",
      price: 69.99,
      description: "comfortable leather shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 17,
      name: "Unisex Pants",
      price: 49.99,
      description: "straight and wide pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 18,
      name: "Unisex Colonies",
      price: 49.99,
      description: "delicious fragrance",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 19,
      name: "Unisex Coats",
      price: 79.99,
      description: "long cotton coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
  
  ];

  export default getProductById;