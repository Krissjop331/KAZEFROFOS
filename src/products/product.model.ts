import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductCharacteristic } from './product-characteristic.model';
import { ProductImage } from './product-image.model';
import { Order } from 'src/orders/order.model';
import { ProductTranslation } from './product-translation.model';

interface ProductCreationAttrs {
  name: string;
  description: string;
  mainImage: string
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  manufacturer: string;

  @Column(DataType.TEXT)
  description: string;

  @HasMany(() => ProductCharacteristic)
  characteristics: ProductCharacteristic[];

  @HasMany(() => ProductImage)
  images: ProductImage[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => ProductTranslation)
  translations: ProductTranslation[];
}