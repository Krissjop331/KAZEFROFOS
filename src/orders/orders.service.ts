// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Order } from './order.model';
// import { CreateOrderDto } from './dto/create-order.dto';

// @Injectable()
// export class OrdersService {

//     constructor(
//         @InjectModel(Order)
//         private orderModel: typeof Order,
//       ) {}
    
//       create(createOrderDto: CreateOrderDto) {
//         return this.orderModel.create(createOrderDto);
//       }
    
//       findAll() {
//         return this.orderModel.findAll();
//       }
    
//       findOne(id: number) {
//         return this.orderModel.findOne({ where: { id } });
//       }

// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.model'; // путь к модели Product

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({ include: [Product] });
  }

  findOne(id: number) {
    return this.orderModel.findOne({ where: { id }, include: [Product] });
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await order.destroy();
  }
}