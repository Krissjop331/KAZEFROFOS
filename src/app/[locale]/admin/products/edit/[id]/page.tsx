'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './ProductEdit.module.css';

// Загружаем ReactQuill динамически, чтобы избежать ошибок на серверной стороне
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Импортируем функции API
import { fetchProduct, updateProduct, removeCharacteristic, uploadImages, removeImage } from '@/app/[locale]/api/products/admin/products/route2';

// Интерфейсы для типизации данных
interface Characteristic {
  id?: number;
  name: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  description: string;
  characteristics: Characteristic[];
  images: { id: number; url: string }[];
}

const EditProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { id } = useParams();
  const router = useRouter();
  const apiUrl = process.env.API_URL || '';

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const productData = await fetchProduct(Number(id));
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // Валидация
    const newErrors: string[] = [];
    if (!product.name) newErrors.push('Название товара обязательно');
    if (!product.category) newErrors.push('Категория товара обязательна');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateProduct(Number(id), product);

      if (newImages.length > 0) {
        await uploadImages(Number(id), newImages);
      }

      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddCharacteristic = () => {
    if (product) {
      setProduct(prev => ({
        ...prev!,
        characteristics: [...prev!.characteristics, { name: '', value: '' }]
      }));
    }
  };

  const handleUpdateCharacteristic = (index: number, field: 'name' | 'value', value: string) => {
    if (product) {
      setProduct(prev => ({
        ...prev!,
        characteristics: prev!.characteristics.map((char, i) => 
          i === index ? { ...char, [field]: value } : char
        )
      }));
    }
  };

  const handleRemoveCharacteristic = async (index: number) => {
    if (product) {
      const charToRemove = product.characteristics[index];
      if (charToRemove.id) {
        try {
          await removeCharacteristic(Number(id), charToRemove.id);
        } catch (error) {
          console.error('Error removing characteristic:', error);
          return;
        }
      }
      setProduct(prev => ({
        ...prev!,
        characteristics: prev!.characteristics.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files);
    setImageNames(files.map(file => file.name));
  };

  const handleRemoveImage = async (imageId: number) => {
    try {
      await removeImage(Number(id), imageId);
      if (product) {
        setProduct(prev => ({
          ...prev!,
          images: prev!.images.filter(img => img.id !== imageId)
        }));
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Продукт <i>{product.name}</i> — Изменить</h1>
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((error, index) => (
              <p key={index} className={styles.error}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleUpdateProduct} className={styles.form}>
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
            <div className={styles.imageContainer}>
              {product.images.map((image) => (
                <div key={image.id} className={styles.imagePreview}>
                  <img className={styles.images} src={`${apiUrl}${image.url}`} alt={`Product ${image.id}`} />
                  <button type="button" onClick={() => handleRemoveImage(image.id)} className={styles.removeImageButton}>X</button>
                </div>
              ))}
            </div>
            <div className={styles.uploadButton}>
              <input
                type="file"
                onChange={handleImageUpload}
                name="images"
                multiple
                accept="image/*"
                id="image-upload" 
                hidden
              />
              <label htmlFor="image-upload" className={styles.labels}>Загрузить изображение</label>
            </div>
            <div className={styles.imageNames}>
              {imageNames.length > 0 && imageNames.map((name, index) => (
                <div key={index} className={styles.imageName}>{name}</div>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>ОБНОВИТЬ</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;