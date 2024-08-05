// import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

// // Здесь пишем поля, которые будут нужны для создания объкта из этого класса
// interface OrderCreationAttrs {
//     product: string,
//     category: string,
//     manufacturer: string,
//     date: Date,
//     email: string,
// }

// @Table({tableName: "order"})
// export class Order extends Model<Order, OrderCreationAttrs> {

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   product: string;

//   @Column(DataType.STRING)
//   category: string;

//   @Column(DataType.STRING)
//   manufacturer: string;

//   @Column(DataType.DATE)
//   date: Date;

//   @Column(DataType.STRING)
//   telephone: string;

// }

import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from '../products/product.model'; // путь к модели Product

interface OrderCreationAttrs {
  productId: number;
  date: Date;
  telephone: string;
}

@Table({ tableName: "orders" }) // убедитесь, что имя таблицы корректное
export class Order extends Model<Order, OrderCreationAttrs> {

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.STRING)
  telephone: string;
}