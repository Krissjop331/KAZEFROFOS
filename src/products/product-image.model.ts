import { ForeignKey, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductImageCreationAttrs {
  productId: number;
  url: string;
}

@Table({ tableName: 'product_image' })
export class ProductImage extends Model<ProductImage, ProductImageCreationAttrs> {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column(DataType.STRING)
  url: string;
}