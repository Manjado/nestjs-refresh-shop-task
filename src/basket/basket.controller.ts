import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  ListProductsInBasketResponse,
  GetTotalPriceResponse,
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

  @Get('/')
  listProductsInBasket(): ListProductsInBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
