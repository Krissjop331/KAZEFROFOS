'use client';

import { useTranslations } from "next-intl";
import styles from './Contact.module.css';
import GoogleMapComponent from "./GoogleMapComponent";
import { Button } from "@mui/material";

export default function Contact() {
  const t = useTranslations('Index');

  return (
    <div className={styles.contactPage}>
      <h1 className={styles.titless}>КОНТАКТЫ</h1>
      <div className={styles.contactContainer}>
        <div className={styles.contactDetails}>
          <div className={styles.contactDetails_block}>
            <h2 className={styles.contact_title}>Адрес</h2>
            <p className={styles.contact_detail}>г. Москва, улица Дубынина 42</p>
          </div>
          <div className={styles.contactDetails_block}>
            <h2 className={styles.contact_title}>Телефон</h2>
            <p className={styles.contact_detail}>8 707 555 22 22</p>          
          </div>
          <div className={styles.contactDetails_block}>
            <h2 className={styles.contact_title}>Эл. почта</h2>
            <p className={styles.contact_detail}>kaze@mail.ru</p>          
          </div>
          <div className={styles.contactForm}>
            <h1 className={styles.titles}>Свяжитесь с нами</h1>
            <input type="email" placeholder="Введите email" className={styles.input} />
            <input type="tel" placeholder="Введите телефон" className={styles.input} />
            <textarea placeholder="Введите сообщение" className={styles.textarea}></textarea>
            <Button className={styles.submitButton}>ОТПРАВИТЬ</Button>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <GoogleMapComponent />
        </div>
      </div>
    </div>
  );
}