import { AddProductDto } from 'src/basket/dto/add-product.dto';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | { isSuccess: false };

export interface RemoveProductFromBasketResonse {
  isSuccess: boolean;
}

interface OneItemInBasket {
  id: string;
  count: number;
}

export type GetTotalPriceResponse =
  | number
  | { isSuccess: false; alternativeBasket: AddProductDto[] };

export type ListProductsInBasketResponse = OneItemInBasket[];
