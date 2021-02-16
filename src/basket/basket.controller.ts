import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  ListProductsInBasketResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResonse,
  GetBasketStatsResponse,
} from 'src/interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}
  @Post('/')
  addProductToBasket(
    @Body() item: AddProductDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.add(item);
  }

  @Get('/admin')
  getBasketFromAdmin(): Promise<ListProductsInBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  getStats(): Promise<GetBasketStatsResponse> {
    return this.basketService.getStats();
  }

  @Get('/:userId')
  listProductsInBasket(
    @Param('userId') userId: string,
  ): Promise<ListProductsInBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/total-price/:userId')
  getTotalPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }

  @Delete('/all/:userId')
  clearBasket(@Param('userId') userId: string) {
    return this.basketService.clearBasket(userId);
  }

  @Delete('/:itemInBasketId/:userId')
  removeProduct(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasketResonse> {
    return this.basketService.remove(itemInBasketId, userId);
  }
}
