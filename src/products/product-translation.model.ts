import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductTranslationCreationAttrs {
  productId: number;
  locale: string;
  name: string;
  description: string;
}

@Table({ tableName: 'product_translation' })
export class ProductTranslation extends Model<ProductTranslation, ProductTranslationCreationAttrs> {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  locale: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}