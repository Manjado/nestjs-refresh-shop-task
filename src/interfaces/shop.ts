export interface ShopItemInterface {
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItemInterface[];
