import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

// Здесь пишем поля, которые будут нужны для создания объкта из этого класса
interface ProductCharacteristicCreationAttrs {
    productId: number,
    name: string,
    value: string
}

@Table({tableName: "product_characteristic"})
export class ProductCharacteristic extends Model<ProductCharacteristic, ProductCharacteristicCreationAttrs> {

    @ForeignKey(() => Product)
    @Column
    productId: number;
  
    @Column
    name: string;
  
    @Column
    value: string;
}