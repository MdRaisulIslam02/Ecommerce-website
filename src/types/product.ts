// Draft frontend model. Map Laravel resources to this model after the API contract is agreed.
export interface Product {
  id: number | string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
