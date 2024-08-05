export interface Product {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    characteristics: Characteristic[];
    images: Image[];
    category: string;
    manufacturer: string;
  }
  
  export interface Characteristic {
    id: number;
    name: string;
    value: string;
  }
  
  export interface Image {
    id: number;
    url: string;
  }