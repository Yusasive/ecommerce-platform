export enum ProductCategory {
    Electronics = 'Electronics',
    Clothing = 'Clothing',
    Home = 'Home',
    Sports = 'Sports',
    Books = 'Books',
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: ProductCategory;
  }
  