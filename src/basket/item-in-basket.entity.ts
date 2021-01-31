import { ShopItem } from '../shop/shop-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddProductDto } from './dto/add-product.dto';
import { User } from 'src/user/user.entity';

@Entity()
export class ItemInBasket extends BaseEntity implements AddProductDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @ManyToOne((type) => ShopItem, (entity) => entity.itemsInBasket)
  @JoinColumn()
  shopItem: ShopItem;

  @ManyToOne((type) => User, (entity) => entity.itemsInBasket)
  @JoinColumn()
  user: User;
}
