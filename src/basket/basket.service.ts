import { Injectable, Inject } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResonse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  async add(item: AddProductDto): Promise<AddProductToBasketResponse> {
    const { name, count } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !(await this.shopService.hasItem(name))
    ) {
      return {
        isSuccess: false,
      };
    }
    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResonse {
    const { items } = this;
    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    }
    items.splice(index, 1);

    return {
      isSuccess: true,
    };
  }
  list(): ListProductsInBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPrice(item.name)) * item.count * 1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
