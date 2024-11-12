import CoatsKids1 from '../assets/Prodcuts/Kids/Coats/CoatsKids1.jpg'


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
    //T-Shirt
    {
      id: 1,
      name: "classic white t-shirt kids",
      price: 19.99,
      description: "Comfortable cotton t-shirt for children",
      image: CoatsKids1,
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 2,
      name: "classic black t-shirt for kidst",
      price: 19.99,
      description: "Comfortable cotton t-shirt for children",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 3,
      name: "green t-shirt kids",
      price: 19.99,
      description: "Comfortable cotton t-shirt for children",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 4,
      name: "printed t-shirt",
      price: 24.99,
      description: "spiderman print t-shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 5,
      name: "printed t-shirt",
      price: 24.99,
      description: "dragon ball z printed t-shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 6,
      name: "blue t-shirt",
      price: 19.99,
      description: "Blue cotton t-shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 7,
      name: "Round neck t-shirt",
      price: 19.99,
      description: "Yellow round neck children's t-shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 8,
      name: "Striped T-shirt",
      price: 19.99,
      description: "Red and white striped t-shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 9,
      name: "Football team t-shirt",
      price: 19.99,
      description: "Argentina team shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    {
      id: 10,
      name: "printed t-shirt",
      price: 19.99,
      description: "Argentina team shirt",
      image: "https://via.placeholder.com/200?text=Kid+Graphic",
      category: "Kids",
      subcategory: "T-Shirt"
    },
    //Shoes 
    {
      id: 11,
      name: "summer sports",
      price: 29.99,
      description: "sports shoes for summer",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 12,
      name: "breathable shoe",
      price: 39.99,
      description: "sporty fashion casual non-slip",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 13,
      name: "oxford shoe",
      price: 59.99,
      description: "children's oxford shoes",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 14,
      name: "sports kids cord",
      price: 59.99,
      description: "Kids core blue leather shoes",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 15,
      name: "school shoe",
      price: 29.99,
      description: "brown school shoe",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 16,
      name: "Rechargeable shoes with LED lights",
      price: 89.99,
      description: "Shoes with lights and wheels",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 17,
      name: "Rechargeable shoes with LED lights",
      price: 79.99,
      description: "Shoes with lightss",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "shoes"
    },
    {
      id: 18,
      name: "sports shoes",
      price: 29.99,
      description: "puma sports shoes",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 19,
      name: "sports shoes",
      price: 29.99,
      description: "black sports shoes",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    {
      id: 20,
      name: "tennis boot",
      price: 59.99,
      description: "Black and brown boot-type tennis shoes",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Shoes"
    },
    //Pants
    {
      id: 21,
      name: "Kid's Jeans",
      price: 29.99,
      description: "Durable denim jeans for active kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 22,
      name: "black pants",
      price: 29.99,
      description: "straight black tube pants",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 23,
      name: "green jeans",
      price: 29.99,
      description: "green cargo jean",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 24,
      name: "beige jeans",
      price: 29.99,
      description: "beige cargo jeans",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 25,
      name: "sleep pants",
      price: 29.99,
      description: "blue sleep pants for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 26,
      name: "kids leggings",
      price: 39.99,
      description: "green kids leggings",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 27,
      name: "Drill pants",
      price: 49.99,
      description: "Brown drill pants for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 28,
      name: "camouflage drill pants",
      price: 69.99,
      description: "beige camouflage drill pants",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 29,
      name: "jean for boy",
      price: 59.99,
      description: "blue jeans for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    {
      id: 30,
      name: "mini panda pants",
      price: 79.99,
      description: "blue or brown panda mini pants",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Pants"
    },
    //Colonies
    {
      id: 31,
      name: "puchini colony",
      price: 29.99,
      description: "puchini colony for children",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 32,
      name: "bvlgari cologne",
      price: 59.99,
      description: "bvlgari cologne always clean",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 33,
      name: "spider man colony",
      price: 39.99,
      description: "spider man colony",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 34,
      name: "esika colony",
      price: 29.99,
      description: "esika colony of force command",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 35,
      name: "lightning mcqueen colony",
      price: 39.99,
      description: "lightning mcqueen colony",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 36,
      name: "chicco cologne",
      price: 69.99,
      description: "chicco cologne for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 37,
      name: "mini chics colony",
      price: 69.99,
      description: "cologne for mini chics girls",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 38,
      name: "duo colonies",
      price: 49.99,
      description: "duo avon colonies, boy and girl",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 39,
      name: "Kid princess cologne",
      price: 59.99,
      description: "Kid cologne princess snow white",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    {
      id: 40,
      name: "blue fragrances for kids",
      price: 29.99,
      description: "blue fragrances for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Colonies"
    },
    //coats
    {
      id: 41,
      name: "Green coat",
      price: 29.99,
      description: "Green winter coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coat"
    },
    {
      id: 42,
      name: "Children's down coat",
      price: 29.99,
      description: "Children's blue down coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coat"
    },
    {
      id: 43,
      name: "hooded jacket",
      price: 29.99,
      description: "blue hooded jacket",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coat"
    },
    {
      id: 44,
      name: "boy coat",
      price: 29.99,
      description: "boy coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 45,
      name: " girl coat",
      price: 29.99,
      description: "Pink girl coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 46,
      name: "winter coat girl",
      price: 29.99,
      description: "pink winter coat for girls",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 47,
      name: "wool coat",
      price: 29.99,
      description: "children's wool coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 48,
      name: "children's wool coat",
      price: 29.99,
      description: "Dark green long wool coat for kids",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 49,
      name: "Winter coat for children",
      price: 29.99,
      description: "Children's winter hooded coat",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    {
      id: 50,
      name: "Duo coats in wool",
      price: 29.99,
      description: "Duo wool and furry coats for boys and girls",
      image: "https://via.placeholder.com/200?text=Kid+Jeans",
      category: "Kids",
      subcategory: "Coats"
    },
    
    // Men
    //T-shirt
    {
      id: 51,
      name: "men's t-shirt",
      price: 24.99,
      description: "Men's short-sleeved plain t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 52,
      name: "Men's Classic T-Shirt",
      price: 19.99,
      description: "white basic t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 53,
      name: "texture t-shirt",
      price: 24.99,
      description: "plain textured t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 54,
      name: "polo shirt",
      price: 24.99,
      description: "Classic polo shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 55,
      name: "elegant men's t-shirt",
      price: 24.99,
      description: "elegant men's t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 56,
      name: "short sleeve t-shirt",
      price: 24.99,
      description: "Short sleeve cotton t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 57,
      name: "v neck t-shirt",
      price: 24.99,
      description: "v neck t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 58,
      name: "black polo shirt",
      price: 24.99,
      description: "black polo shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 59,
      name: "Skull grey t-shirt",
      price: 24.99,
      description: "Skull grey t-shirt",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    {
      id: 60,
      name: "Men's Classic T-Shirt",
      price: 24.99,
      description: "Classic fit cotton t-shirt for men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "T-Shirt"
    },
    //Pants
    {
      id: 61,
      name: "black pants men",
      price: 64.99,
      description: "black pants men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 62,
      name: "duo jean man",
      price: 64.99,
      description: "duo jean man",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 63,
      name: "basic pants for men",
      price: 64.99,
      description: "basic pants for men",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 64,
      name: "men's sports pants",
      price: 64.99,
      description: "men's sports pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 65,
      name: "sports pants",
      price: 64.99,
      description: "green sports pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 66,
      name: "black pants",
      price: 64.99,
      description: "black north face pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 67,
      name: "sports pants",
      price: 64.99,
      description: "grey fleece lined sports pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 68,
      name: "wandering pants",
      price: 64.99,
      description: "blue wander pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 69,
      name: "sports pants",
      price: 64.99,
      description: "box ns north face sports pants",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    {
      id: 70,
      name: "men's jeans",
      price: 64.99,
      description: "blue men's jeans",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Pants"
    },
    //Shoes
    {
      id: 71,
      name: "MMen's leather shoes",
      price: 54.99,
      description: "Men's leather shoes",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 72,
      name: "leather shoes",
      price: 54.99,
      description: "sand-colored leather shoes",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 73,
      name: "adidas sneakers",
      price: 54.99,
      description: "white adidas sneakers",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 74,
      name: "adidas men's shoes",
      price: 54.99,
      description: "adidas men's shoes yeezy",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 75,
      name: "Brahma boots",
      price: 54.99,
      description: "brown brahma boots",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 76,
      name: "men's sneakers",
      price: 54.99,
      description: "retro boots 1",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 77,
      name: "Jordan 4 boots",
      price: 54.99,
      description: "nike jordan 4 boots",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 78,
      name: "jordan boots",
      price: 54.99,
      description: "black and white jordan boots",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 79,
      name: "Jordan sneakers",
      price: 54.99,
      description: "Jordan sneakers",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    {
      id: 80,
      name: "nike jordan 1",
      price: 54.99,
      description: "nike jordan 1 mid retro milan shoes",
      image: "https://via.placeholder.com/200?text=Men+TShirt",
      category: "Mens",
      subcategory: "Shoes"
    },
    //Colonies
    {
      id: 81,
      name: "blue intense perfume",
      price: 39.99,
      description: "blue intense perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 82,
      name: "Guio water cologne",
      price: 39.99,
      description: "Guio water cologne",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 83,
      name: "Chanel Blue Perfume",
      price: 39.99,
      description: "Chanel Blue Perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 84,
      name: "Wild perfume",
      price: 39.99,
      description: "Wild perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 85,
      name: "Parma water perfume",
      price: 39.99,
      description: "Parma water perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 86,
      name: "perfume srn",
      price: 39.99,
      description: "Fine and exclusive srn perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 87,
      name: "perfume Stronger with you intensely",
      price: 39.99,
      description: "perfume Stronger with you intensely",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 88,
      name: "vintage heroes perfume",
      price: 39.99,
      description: "vintage heroes perfume",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 89,
      name: "perfume nature mood",
      price: 39.99,
      description: "perfume nature mood green",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    {
      id: 90,
      name: "signature perfume L'bel",
      price: 39.99,
      description: "signature perfume L'bel",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Colonies"
    },
    //Coats
    {
      id: 91,
      name: "gray coat",
      price: 79.99,
      description: "gray coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 92,
      name: "long sand coat",
      price: 79.99,
      description: "long sand coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 93,
      name: "green coat",
      price: 79.99,
      description: "green hooded coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 94,
      name: "long grey coat",
      price: 79.99,
      description: "long grey coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 95,
      name: "blue jacket",
      price: 79.99,
      description: "blue jacket",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 96,
      name: "long white coat",
      price: 79.99,
      description: "long white coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 97,
      name: "green rain jacket",
      price: 59.99,
      description: "green rain jacket",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 98,
      name: "formal plaid coat",
      price: 89.99,
      description: "formal plaid coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 99,
      name: "Men's Coats",
      price: 79.99,
      description: "delicate cotton coats",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    {
      id: 100,
      name: "black coat",
      price: 99.99,
      description: "black coat",
      image: "https://via.placeholder.com/200?text=Men+Jeans",
      category: "Mens",
      subcategory: "Coats"
    },
    // Women
    //t-shirt
    {
      id: 101,
      name: "Women's Fashion T-Shirt",
      price: 19.99,
      description: "Trendy and comfortable women's t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 102,
      name: "black basic t-shirt",
      price: 19.99,
      description: "black basic t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    
    {
      id: 103,
      name: "red basic t-shirt",
      price: 29.99,
      description: "red basic t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 104,
      name: "women's printed t-shirt",
      price: 29.99,
      description: "Pink Panther Women's Printed T-Shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 105,
      name: "elegant women's t-shirt",
      price: 59.99,
      description: "elegant women's t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 106,
      name: "women's sports t-shirt",
      price: 39.99,
      description: "women's sports t-shirt",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 107,
      name: "elegant blouse",
      price: 69.99,
      description: "elegant blouse",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 108,
      name: "red elegant blouse",
      price: 49.99,
      description: "Elegant blouse",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 109,
      name: "elegant white blouse",
      price: 29.99,
      description: "Elegant white open neck blouset",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    {
      id: 110,
      name: "printed blouse",
      price: 29.99,
      description: "printed blouse",
      image: "https://via.placeholder.com/200?text=Women+TShirt",
      category: "Women",
      subcategory: "T-Shirt"
    },
    //shoes
    {
      id: 111,
      name: "sports shoes",
      price: 79.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 112,
      name: "pink women's heels",
      price: 89.99,
      description: "pink women's heels",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 113,
      name: "black strap shoes",
      price: 89.99,
      description: "black strap shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 114,
      name: "white casual sneakers",
      price: 99.99,
      description: "white casual sneakers",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 115,
      name: "Women's open-toed sneakers",
      price: 79.99,
      description: "Women's open-toed sneakers",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 116,
      name: "lace-up sandals",
      price: 89.99,
      description: "lace-up sandals",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 117,
      name: "Women's Shoes",
      price: 69.99,
      description: "Women's Shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 118,
      name: "cream colored ballet flats",
      price: 79.99,
      description: "cream colored ballet flats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 119,
      name: "black leather shoes",
      price: 109.99,
      description: "black leather shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    {
      id: 120,
      name: "elegant red sneakers",
      price: 100.99,
      description: "elegant red sneakers",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Shoes"
    },
    //Pants
    {
      id: 121,
      name: "white cargo pants",
      price: 74.99,
      description: "white cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 122,
      name: "jeans",
      price: 74.99,
      description: "jeans blue",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 123,
      name: "oversized pants",
      price: 84.99,
      description: "green oversized pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 124,
      name: "cowboy pants",
      price: 64.99,
      description: "cowboy pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 125,
      name: "blue skinny jeans",
      price: 54.99,
      description: "Stylish high-waisted skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 126,
      name: "baggy ripped",
      price: 54.99,
      description: "pants baggy ripped",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 127,
      name: "wide leg pants women",
      price: 54.99,
      description: "wide leg pants women",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 128,
      name: "black skinny pants",
      price: 44.99,
      description: "black skinny pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 129,
      name: "beach pants",
      price: 54.99,
      description: "beach pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    {
      id: 130,
      name: "cream straight trousers",
      price: 54.99,
      description: "cream straight trousers",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Pants"
    },
    //Colonies
    {
      id: 131,
      name: "Women's Colonies",
      price: 54.99,
      description: "Telva colony",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 132,
      name: "Women's Colonies",
      price: 94.99,
      description: "coco chanel cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 133,
      name: "Women's Colonies",
      price: 54.99,
      description: "esika vibrance cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 134,
      name: "Women's Colonies",
      price: 94.99,
      description: "gucci bloom cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 135,
      name: "Women's Colonies",
      price: 54.99,
      description: "Chanel cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 136,
      name: "Women's Colonies",
      price: 104.99,
      description: "2v rose cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 137,
      name: "Women's Colonies",
      price: 54.99,
      description: "Grazzia Esika colony",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 138,
      name: "Women's Colonies",
      price: 54.99,
      description: "delicate fragrance dream esika colony",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 139,
      name: "Women's Colonies",
      price: 54.99,
      description: "delicate fragrance Dorsay women's cologne",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    {
      id: 140,
      name: "Women's Colonies",
      price: 54.99,
      description: "delicate fragrance magnat woman colony",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Colonies"
    },
    //Coats
    {
      id: 141,
      name: "Women's Coats",
      price: 74.99,
      description: "long sand coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 142,
      name: "Women's Coats",
      price: 84.99,
      description: "long white coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 143,
      name: "Women's Coats",
      price: 54.99,
      description: "green short coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 144,
      name: "Women's Coats",
      price: 54.99,
      description: "short black jacket",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 145,
      name: "Women's Coats",
      price: 104.99,
      description: "long printed coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 146,
      name: "Women's Coats",
      price: 94.99,
      description: "long brown coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 147,
      name: "Women's Coats",
      price: 84.99,
      description: "pink long coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 148,
      name: "Women's Coats",
      price: 94.99,
      description: "long green coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 149,
      name: "Women's Coats",
      price: 94.99,
      description: "long black coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
    {
      id: 150,
      name: "Women's Coats",
      price: 84.99,
      description: "short grey coat",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Women",
      subcategory: "Coats"
    },
  
    //Unisex
    //T-Shirt
    {
      id: 151,
      name: "Unisex T-Shirt",
      price: 44.99,
      description: "basic color t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 152,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "white t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 153,
      name: "Unisex T-Shirt",
      price: 54.99,
      description: "T-shirt top corner print",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 154,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "round neck t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 155,
      name: "Unisex T-Shirt",
      price: 64.99,
      description: "colored t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 156,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "orange t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 157,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "combined printed t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 158,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "combined printed t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 159,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "combined printed t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    {
      id: 160,
      name: "Unisex T-Shirt",
      price: 34.99,
      description: "combined printed t-shirt",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "T-Shirt"
    },
    //shoes
    {
      id: 161,
      name: "Unisex Shoes",
      price: 79.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 162,
      name: "Unisex Shoes",
      price: 79.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 163,
      name: "Unisex Shoes",
      price: 89.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 164,
      name: "Unisex Shoes",
      price: 69.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 165,
      name: "Unisex Shoes",
      price: 69.99,
      description: "sports shoes",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 166,
      name: "Unisex Shoes",
      price: 69.99,
      description: "comfortable school shoe",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 167,
      name: "Unisex Shoes",
      price: 79.99,
      description: "light colored boots",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 168,
      name: "Unisex Shoes",
      price: 59.99,
      description: "light colored boots",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 169,
      name: "Unisex Shoes",
      price: 89.99,
      description: "light colored boots",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    {
      id: 170,
      name: "Unisex Shoes",
      price: 109.99,
      description: "light colored boots",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Shoes"
    },
    //pants

    
    {
      id: 171,
      name: "Unisex Pants",
      price: 49.99,
      description: "skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 172,
      name: "Unisex Pants",
      price: 49.99,
      description: "skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 173,
      name: "Unisex Pants",
      price: 49.99,
      description: "skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 174,
      name: "Unisex Pants",
      price: 49.99,
      description: "skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 175,
      name: "Unisex Pants",
      price: 49.99,
      description: "skinny jeans",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 176,
      name: "Unisex Pants",
      price: 49.99,
      description: "light colored skinny cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 177,
      name: "Unisex Pants",
      price: 49.99,
      description: "light colored skinny cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 178,
      name: "Unisex Pants",
      price: 89.99,
      description: "light colored skinny cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 179,
      name: "Unisex Pants",
      price: 59.99,
      description: "light colored skinny cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    {
      id: 180,
      name: "Unisex Pants",
      price: 69.99,
      description: "light colored skinny cargo pants",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Pants"
    },
    //colonies
    {
      id: 181,
      name: "Unisex Colonies",
      price: 49.99,
      description: "delicate women's fragrances from esika",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 182,
      name: "Unisex Colonies",
      price: 49.99,
      description: "delicate women's fragrances from esika",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 183,
      name: "Unisex Colonies",
      price: 59.99,
      description: "delicate women's fragrances from esika",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 184,
      name: "Unisex Colonies",
      price: 69.99,
      description: "delicate women's fragrances from esika",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 185,
      name: "Unisex Colonies",
      price: 59.99,
      description: "delicate women's fragrances from esika",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 186,
      name: "Unisex Colonies",
      price: 99.99,
      description: "delicious exclusive fragrances",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 187,
      name: "Unisex Colonies",
      price: 99.99,
      description: "delicious exclusive fragrances",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 188,
      name: "Unisex Colonies",
      price: 99.99,
      description: "delicious exclusive fragrances",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 189,
      name: "Unisex Colonies",
      price: 99.99,
      description: "delicious exclusive fragrances",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    {
      id: 190,
      name: "Unisex Colonies",
      price: 99.99,
      description: "delicious exclusive fragrances",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Colonies"
    },
    //coats
    
    {
      id: 191,
      name: "Unisex Coats",
      price: 89.99,
      description: "long wool coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 192,
      name: "Unisex Coats",
      price: 89.99,
      description: "long cotton coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 193,
      name: "Unisex Coats",
      price: 89.99,
      description: "long cotton coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 194,
      name: "Unisex Coats",
      price: 79.99,
      description: "long cotton coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 195,
      name: "Unisex Coats",
      price: 79.99,
      description: "long cotton coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 196,
      name: "Unisex Coats",
      price: 79.99,
      description: "cute short coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 197,
      name: "Unisex Coats",
      price: 79.99,
      description: "cute short coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 198,
      name: "Unisex Coats",
      price: 79.99,
      description: "cute short coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 199,
      name: "Unisex Coats",
      price: 79.99,
      description: "cute short coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
    {
      id: 200,
      name: "Unisex Coats",
      price: 79.99,
      description: "cute short coats",
      image: "https://via.placeholder.com/200?text=Women+Jeans",
      category: "Unisex",
      subcategory: "Coats"
    },
  
  ];

  export default getProductById;