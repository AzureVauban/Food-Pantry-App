export interface Pantry {
  id: string;
  name: string;
  createdAt: Date;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  expirationDate?: Date;
  category?: string;
  imageUrl?: string;
}
