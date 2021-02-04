import { Injectable, Inject } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResonse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { ShopItem } from 'src/shop/shop-item.entity';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
import { AddProductDto } from './dto/add-product.dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(ShopService) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
  ) {}

  async add(product: AddProductDto): Promise<AddProductToBasketResponse> {
    const { productId, count, userId } = product;
    const shopItem = await this.shopService.getOneItem(productId);
    const user = await this.userService.getOneUser(userId);

    if (
      typeof productId !== 'string' ||
      typeof userId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      userId === '' ||
      count < 1 ||
      !shopItem ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }
    const item = new ItemInBasket();
    item.count = count;

    await item.save();

    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(
    itemInBaskietId: string,
    userId: string,
  ): Promise<RemoveProductFromBasketResonse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    const item = await ItemInBasket.findOne({
      where: {
        id: itemInBaskietId,
        user,
      },
    });

    if (item) {
      await item.remove();
      return { isSuccess: true };
    }
    return { isSuccess: false };
  }

  async getAllForUser(userId: string): Promise<ListProductsInBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }
    return ItemInBasket.find({
      where: {
        user,
      },
      relations: ['shopItem'],
    });
  }

  async clearBasket(userId: string) {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    await ItemInBasket.delete({
      user,
    });
  }

  async getTotalPrice(userId: string): Promise<GetTotalPriceResponse> {
    const items = await this.getAllForUser(userId);

    return (
      await Promise.all(
        //@ts-ignore
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
