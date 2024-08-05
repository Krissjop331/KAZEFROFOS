import { Module, Logger } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { ProductImage } from './products/product-image.model';
import { Product } from './products/product.model';
import { ProductCharacteristic } from './products/product-characteristic.model';
import { AuthModule } from './auth/auth.module';
import { Order } from './orders/order.model';
import { ProductTranslation } from './products/product-translation.model';

const logger = new Logger('AppModule');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User, ProductImage, Product, ProductCharacteristic, Order, ProductTranslation],
      autoLoadModels: true,
      logging: (msg) => logger.log(msg),
    }),
    UsersModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}