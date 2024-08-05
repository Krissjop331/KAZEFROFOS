'use client';

import { useState } from 'react';
import styles from './Product.module.css';
import { Product } from '@/types/product'; // Убедитесь, что тип Product определен
import ShopIcon from '@/resources/icons/shop_icon.png';
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DOMPurify from 'dompurify';

// Определяем схему валидации
const schema = yup.object({
  telephone: yup.string()
    .required('Номер телефона обязателен')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Неверный формат номера телефона')
    .min(10, 'Номер телефона должен содержать минимум 10 символов'), // Добавляем проверку минимальной длины
}).required();

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL is not defined');
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % (product.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    reset();
    setOrderSuccess(null); // Изменение на null
  };

  const onSubmit = async (data: { telephone: string }) => {
    try {
      await axios.post(`${apiUrl}/orders`, {
        productId: product.id,
        date: new Date(),
        telephone: data.telephone,
      });
      setOrderSuccess('Ваш заказ был успешно подан!');
      reset();
    } catch (error) {
      console.error('Ошибка при подаче заказа:', error);
      setOrderSuccess('Не удалось подать заказ. Попробуйте еще раз.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={`${apiUrl}/${product.images[currentImageIndex].url}`}
                  alt={`Изображение продукта ${currentImageIndex + 1}`}
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.noImage}>Изображение отсутствует</div>
              )}
            </div>
            <div className={styles.imageNavigation}>
              <button onClick={prevImage} className={styles.navButton}>&lt;</button>
              <div className={styles.thumbnails}>
                {product.images && product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${apiUrl}/${image.url}`}
                    alt={`Миниатюра изображения ${index + 1}`}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
              <button onClick={nextImage} className={styles.navButton}>&gt;</button>
            </div>
          </div>
          <div className={styles.infoColumn}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}><strong>Категория: </strong>{product.category}</p>
            <p className={styles.productDescription}><strong>Производитель: </strong>{product.manufacturer}</p>
            <p className={styles.productDescription}>
              <strong>Описание: </strong>
              {/* Используем dangerouslySetInnerHTML и очищаем HTML */}
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || '') }} />
            </p>
            <Button className={styles.button} onClick={handleOpenDialog}>
              <p className={styles.p}>Заказать</p>
              <Image className={styles.img} src={ShopIcon} alt="Купить" />
            </Button>
          </div>
        </div>

        <div className={styles.characteristicsSection}>
          <div className={styles.characteristicsBlock}>
            <h2 className={styles.characteristicsTitle}>Характеристики:</h2>
          </div>
          {product.characteristics && product.characteristics.length > 0 ? (
            <ul className={styles.characteristicsList}>
              {product.characteristics.map((ch, index) => (
                <li key={index} className={styles.characteristicItem}>
                  <strong className={styles.strong}>{ch.name}</strong>
                  <div className={styles.lines}></div>
                  <p className={styles.p}>{ch.value}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noCharacteristics}>Характеристики отсутствуют</p>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} className={styles.dialog}>
        <DialogTitle className={styles.dialogTitle}>Подать заявку</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          {orderSuccess && <p>{orderSuccess}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="telephone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  id="telephone"
                  label="Введите ваш номер телефона"
                  type="tel"
                  fullWidth
                  variant="standard"
                  error={!!errors.telephone}
                  helperText={errors.telephone ? errors.telephone.message : ''}
                />
              )}
            />
            <DialogActions>
              <Button className={styles.buttonDialog} onClick={handleCloseDialog}>Отмена</Button>
              <Button className={styles.buttonDialog} type="submit">Подать заявку</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}