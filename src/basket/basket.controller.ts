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
  listProductsInBasket(): Promise<ListProductsInBasketResponse> {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice();
  }

  @Delete('/all')
  clearBasket() {
    return this.basketService.clearBasket();
  }

  @Delete('/:id')
  removeProduct(
    @Param('id') id: string,
  ): Promise<RemoveProductFromBasketResonse> {
    return this.basketService.remove(id);
  }
}
