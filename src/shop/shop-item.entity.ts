import { ItemInBasket } from '../basket/item-in-basket.entity';
import { ShopItemInterface } from 'src/interfaces/shop';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 1000,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToOne((type) => ItemInBasket, (entity) => entity.shopItem)
  itemInBasket: ItemInBasket;
}
