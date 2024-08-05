'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createProduct, uploadImages, Product as ProductType } from '@/app/[locale]/api/utils/productApi';
import styles from './ProductCreate.module.css';

// Динамический импорт редактора для текста
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Типизация продукта, исключая поля id и images
type Product = Omit<ProductType, 'id' | 'images'>;

const CreateProductPage = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    category: '',
    manufacturer: '',
    characteristics: [],
    description: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    const newErrors: string[] = [];
    if (!product.name) newErrors.push('Название товара обязательно');
    if (!product.category) newErrors.push('Категория товара обязательна');
    if (images.length === 0) newErrors.push('Необходимо загрузить хотя бы одно изображение');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Создание продукта и получение ID
      const { id } = await createProduct(product);

      // Загрузка изображений
      if (images.length > 0) {
        await uploadImages(id, images);
      }

      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors(['Не удалось создать продукт. Попробуйте снова.']); // Обработка ошибок
    }
  };

  const handleAddCharacteristic = () => {
    setProduct(prev => ({
      ...prev,
      characteristics: [...prev.characteristics, { name: '', value: '' }]
    }));
  };

  const handleUpdateCharacteristic = (index: number, field: 'name' | 'value', value: string) => {
    setProduct(prev => ({
      ...prev,
      characteristics: prev.characteristics.map((char, i) =>
        i === index ? { ...char, [field]: value } : char
      )
    }));
  };

  const handleRemoveCharacteristic = (index: number) => {
    setProduct(prev => ({
      ...prev,
      characteristics: prev.characteristics.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setImageNames(files.map(file => file.name));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Создать новый продукт</h1>
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((error, index) => (
              <p key={index} className={styles.error}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleCreateProduct} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Название товара</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Введите название"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Описание товара</label>
            <ReactQuill
              value={product.description}
              onChange={(value) => setProduct({ ...product, description: value })}
              placeholder="Введите описание товара"
              className={styles.quillEditor}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Категория</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              placeholder="Введите категорию"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Производитель</label>
            <input
              type="text"
              value={product.manufacturer}
              onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
              placeholder="Введите производителя"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Характеристики</label>
            {product.characteristics.map((char, index) => (
              <div key={index} className={styles.characteristicRow}>
                <input
                  type="text"
                  value={char.name}
                  onChange={(e) => handleUpdateCharacteristic(index, 'name', e.target.value)}
                  placeholder="Название"
                />
                <input
                  type="text"
                  value={char.value}
                  onChange={(e) => handleUpdateCharacteristic(index, 'value', e.target.value)}
                  placeholder="Параметр"
                />
                <button type="button" onClick={() => handleRemoveCharacteristic(index)} className={styles.removeButton}>X</button>
              </div>
            ))}
            <button type="button" onClick={handleAddCharacteristic} className={styles.addButton}>+</button>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Изображения</label>
            <input
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              id="image-upload"
              hidden
            />
            <div className={styles.uploadButton}>
              <label htmlFor="image-upload" className={styles.labels}>Загрузить изображение</label>
            </div>
            <div className={styles.imageNames}>
              {imageNames.length > 0 && imageNames.map((name, index) => (
                <div key={index} className={styles.imageName}>{name}</div>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>СОЗДАТЬ</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;