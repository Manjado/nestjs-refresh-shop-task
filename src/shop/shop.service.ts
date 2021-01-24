import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  async getProducts(): Promise<GetListOfProductsResponse> {
    return ShopItem.find();
  }

  async hasItem(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPrice(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }
}
