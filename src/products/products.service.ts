
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCharacteristic } from './product-characteristic.model';
import { Product } from './product.model';
import { ProductImage } from './product-image.model';
import { File } from 'multer';
import { join, relative, resolve } from 'path';
import { cwd } from 'process';
import { promises as fs } from 'fs';
import { ProductTranslation } from './product-translation.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductCharacteristic)
    private productCharacteristicModel: typeof ProductCharacteristic,
    @InjectModel(ProductImage)
    private productImageModel: typeof ProductImage,
    @InjectModel(ProductTranslation)
    private productTranslationModel: typeof ProductTranslation,
  ) {}

  async create(createProductDto: CreateProductDto, files: Array<File>) {
    const { translations, characteristics, ...productData } = createProductDto;
    const product = await this.productModel.create(productData);

    if (translations) {
      for (const translation of translations) {
        await this.productTranslationModel.create({
          ...translation,
          productId: product.id,
        });
      }
    }

    if (characteristics) {
      for (const characteristic of characteristics) {
        if (characteristic.name && characteristic.value) {
          await this.productCharacteristicModel.create({
            ...characteristic,
            productId: product.id,
          });
        }
      }
    }

    if (files && files.length > 0) {
      const basePath = 'uploads/products';
      const images = files.map((file) => {
        const fullPath = file.path;
        const relativePath = relative(basePath, fullPath);
        return {
          productId: product.id,
          url: `uploads/products/${relativePath}`.replace(/\\/g, '/'),
        };
      });
      await this.productImageModel.bulkCreate(images);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: Array<File> = []) {
    const { translations, characteristics, images, ...productData } = updateProductDto;
    await this.productModel.update(productData, { where: { id } });

    if (translations) {
      await this.productTranslationModel.destroy({ where: { productId: id } });
      for (const translation of translations) {
        await this.productTranslationModel.create({
          ...translation,
          productId: id,
        });
      }
    }

    if (characteristics) {
      await this.productCharacteristicModel.destroy({ where: { productId: id } });
      for (const characteristic of characteristics) {
        if (characteristic.name && characteristic.value) {
          await this.productCharacteristicModel.create({
            ...characteristic,
            productId: id,
          });
        }
      }
    }

    if (files && files.length > 0) {
      await this.productImageModel.destroy({ where: { productId: id } });
      const basePath = 'uploads/products';
      const images = files.map((file) => {
        const fullPath = file.path;
        const relativePath = relative(basePath, fullPath);
        return {
          productId: id,
          url: `uploads/products/${relativePath}`.replace(/\\/g, '/'),
        };
      });
      await this.productImageModel.bulkCreate(images);
    }

    return this.findOne(id);
  }

  findAll() {
    return this.productModel.findAll({ 
      include: [
        {
          model: ProductCharacteristic,
          as: 'characteristics',
        },
        {
          model: ProductImage,
          as: 'images',
        },
      ],
    });
  }

  findOne(id: number) {
    return this.productModel.findOne({ 
      where: { id },
      include: [
        {
          model: ProductCharacteristic,
          as: 'characteristics',
        },
        {
          model: ProductImage,
          as: 'images',
        },
      ],
    });
  }

  remove(id: number) {
    return this.productModel.destroy({ where: { id } });
  }

  async uploadImages(productId: number, files: Array<File>) {
    const product = await this.findOne(productId);
    if (!product) {
      throw new Error('Product not found');
    }
  
    const images = files.map((file) => ({
      productId: product.id,
      url: join(cwd(), file.path), // Сохраняйте полный путь
    }));
  
    return this.productImageModel.bulkCreate(images);
  }

  

  async addCharacteristic(productId: number, characteristic: { name: string; value: string }) {
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productCharacteristicModel.create({
      ...characteristic,
      productId,
    });
  }

  async removeCharacteristic(productId: number, charId: number) {
    const characteristic = await this.productCharacteristicModel.findOne({
      where: { id: charId, productId },
    });

    if (!characteristic) {
      throw new NotFoundException('Characteristic not found');
    }

    await characteristic.destroy();
    return { message: 'Characteristic removed successfully' };
  }

  async addImage(productId: number, files: Array<File>) {
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    if (files && files.length > 0) {
      const basePath = resolve('./uploads/products'); // Полный путь к папке для изображений
  
      const images = files.map((file) => {
        // Получаем полный путь
        const fullPath = file.path;
  
        // Преобразуем полный путь в относительный
        const relativePath = relative(basePath, fullPath); // Получаем часть пути относительно basePath
  
        return {
          productId: product.id,
          url: `uploads/products/${relativePath}`.replace(/\\/g, '/') // Сохраняем относительный путь
        };
      });
  
      // Сохраняем изображения в базу данных
      return this.productImageModel.bulkCreate(images);
    }
  
    throw new NotFoundException('No images uploaded');
  }

  async removeImage(productId: number, imageId: number) {
    const image = await this.productImageModel.findOne({
      where: { id: imageId, productId },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Удаление файла изображения
    const fullPath = join(cwd(), 'uploads/products', image.url);
    try {
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('Error deleting image file:', error);
    }

    await image.destroy();
    return { message: 'Image removed successfully' };
  }
}