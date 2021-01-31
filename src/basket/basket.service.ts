import { Injectable, Inject } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResonse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { ShopItem } from 'src/shop/shop-item.entity';
import { ShopService } from 'src/shop/shop.service';
import { AddProductDto } from './dto/add-product.dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  async add(product: AddProductDto): Promise<AddProductToBasketResponse> {
    const { id, count } = product;
    const shopItem = await this.shopService.getOneItem(id);

    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }
    const item = new ItemInBasket();
    item.count = count;

    await item.save();

    item.shopItem = shopItem;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveProductFromBasketResonse> {
    const item = await ItemInBasket.findOne(id);

    if (item) {
      await item.remove();
      return { isSuccess: true };
    }
    return { isSuccess: false };
  }

  async list(): Promise<ListProductsInBasketResponse> {
    return ItemInBasket.find({
      relations: ['shopItem'],
    });
  }

  async clearBasket() {
    await ItemInBasket.delete({});
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await this.list();

    return (
      await Promise.all(
        //@ts-ignore
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
