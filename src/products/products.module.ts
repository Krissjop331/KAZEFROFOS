import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductCharacteristic } from './product-characteristic.model';
import { ProductImage } from './product-image.model';
import { Order } from 'src/orders/order.model';
import { ProductTranslation } from './product-translation.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature(
    [Product, ProductCharacteristic, ProductImage, Order, ProductTranslation]
  )],
})
export class ProductsModule {}
