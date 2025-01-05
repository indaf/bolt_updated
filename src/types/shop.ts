export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
  likes: string[];
  created_at: number;
  updated_at: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: string;
  image: File;
  url: string;
}