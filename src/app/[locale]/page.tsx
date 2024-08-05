'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from '../products/productsSlice';
import { useTranslations } from "next-intl";
import styles from './Home.module.css';
import Logo from '@/resources/icons/Main_logo.svg';
import Image from 'next/image';
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AboutImage from '@/resources/Цели_линия.png';
import DOMPurify from 'dompurify';

// Определение типа для `apiUrl`
const apiUrl = process.env.API_URL as string | undefined;

export default function Home() {
  const t = useTranslations('Index');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const [keywords, setKeywords] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);

  const [visibleProducts, setVisibleProducts] = useState<number>(6);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      const allKeywords = products.flatMap(product => [
        product.name,
        product.category,
        ...(product.characteristics || []).map(char => char.value),
      ]);
      const uniqueKeywords = Array.from(new Set(allKeywords));
      setKeywords(uniqueKeywords);

      // Сохранение ключевых слов в localStorage
      localStorage.setItem('productKeywords', JSON.stringify(uniqueKeywords));
    }
  }, [products, status]);

  const handleShowMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  const truncateText = (text: string, limit: number): string => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <div>
      <div className={styles.home}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <Image className={styles.logo} width={570} height={300} src={Logo} alt="Logo" />
            <div className={styles.textContent}>
              <p className={styles.subtitle}>Здоровье и энергия каждый день!</p>
              <p className={styles.description}>Лучшие добавки для вашего здоровья и спортивных достижений</p>
              <Button className={styles.button}><Link href={`/${currentLocale}/products`}>ВЫБРАТЬ</Link></Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.aboutSection}>
        <div className={styles.aboutLeft}>
          <h2 className={styles.aboutTitle}>О нас</h2>
          <div className="aboutContent">
            <p className={styles.aboutText}>
              Противоположная точка зрения подразумевает, что некоторые особенности внутренней политики неоднозначны и будут в равной степени предоставлены сами себе. Таким образом, внедрение современных методик влечет за собой процесс внедрения и модернизации вывода текущих активов. Каждый из нас понимает очевидную вещь: существующая теория представляет собой интересный эксперимент проверки системы массового участия.
            </p>
            <p className={styles.aboutText}>
              Противоположная точка зрения подразумевает, что некоторые особенности внутренней политики неоднозначны и будут в равной степени предоставлены сами себе.
            </p>
            <Button className={styles.aboutButton}><Link href={`/${currentLocale}/about`}>Подробнее</Link></Button>
          </div>
        </div>
        <div className={styles.aboutRight}>
          <h2 className={styles.aboutTitle}>Почему мы?</h2>
          <div className={styles.whyUs}>
            <Image className={styles.whyUsImage} src={AboutImage} alt="Почему мы?" />
            <ul className={styles.whyUsList}>
              <li>Цены ниже конкурентов</li>
              <li>Натуральные продукты</li>
              <li>Быстрая доставка</li>
              <li>Выгодные условия</li>
              <li>Быстрая обратная связь</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.catalog}>
        <h1 className={styles.aboutTitle}>Каталог</h1>
        <div className={styles.container}>
          <div className={styles.container__row}>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading products</p>}
            {status === 'succeeded' && products.slice(0, visibleProducts).map((product) => (
              <div className={styles.product} key={product.id}>
                {product.images && product.images.length > 0 && (
                  <Image 
                    src={`${apiUrl ? apiUrl : ''}/${product.images[0].url}`} 
                    alt={product.name} 
                    width={200} 
                    height={200}
                    className={styles.productImage}
                  />
                )}
                <div className={styles.product__content}>
                  <h3 className={styles.product__contentTitle}>{product.name}</h3>
                  <p 
                    className={styles.product__contentText}
                    dangerouslySetInnerHTML={{ __html: truncateText(DOMPurify.sanitize(product.description), 120) }}
                  />
                  <Button className={styles.button}><Link href={`/${currentLocale}/products/${product.id}`}>ПОДРОБНЕЕ</Link></Button>
                </div>
              </div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <Button className={styles.showMoreButton} onClick={handleShowMore}>Показать еще</Button>
          )}
        </div>
      </div>

      {/* СВЯЖИТЕСЬ С НАМИ */}
      <div className={styles.contacts_about}>
        <h1 className={styles.aboutTitle}>Свяжитесь с нами</h1>
        <form className={styles.contactForm}>
          <input type="email" placeholder="Введите email" className={styles.input} />
          <input type="tel" placeholder="Введите телефон" className={styles.input} />
          <textarea placeholder="Введите сообщение" className={styles.textarea}></textarea>
          <Button className={styles.submitButton}>ОТПРАВИТЬ</Button>
        </form>
      </div>
    </div>
  );
}