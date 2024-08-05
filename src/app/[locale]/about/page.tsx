'use client'

import { useTranslations } from "next-intl";
import styles from './About.module.css';
import Logo from '@/resources/white_logo.png'
import Image from 'next/image';
import AboutImage from '@/resources/about-image.jpg';
import HistoryImage from "@/resources/history_image.png";
import PrivelegyAssortiImage from '@/resources/icons/1.png';
import PrivelegySpecialImage from '@/resources/icons/2.png';
import PrivelegySecurityImage from '@/resources/icons/3.png';
import PirvelegySocialImage from '@/resources/icons/4.png';

export default function About() {
  const t = useTranslations('Index');

  return (
    <div>
      <div className={styles.home}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <Image className={styles.logo} width={570} height={300} src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className={styles.aboutSection}>
        <div className={styles.aboutLeft}>
          <h2 className={styles.aboutTitle}>О нас</h2>
          <p className={styles.aboutText}>В рамках спецификации современных стандартов, элементы политического процесса объективно рассмотрены соответствующими инстанциями. Следует отметить, что курс на социально-ориентированный национальный проект в значительной степени обусловливает важность глубокомысленных рассуждений. Противоположная точка зрения подразумевает, что диаграммы связей являются только методом политического участия и подвергнуты целой серии независимых исследований.</p>
        </div>
        <div className={styles.aboutRight}>
          <div className={styles.whyUs}>
            <Image className={styles.whyUsImage} src={AboutImage} alt="Почему мы?" />
          </div>
        </div>
      </div>
      {/* HISTORY */}
      <div className={styles.history__company}>
        <div className={styles.history_container}>
          <div className={styles.history__company_left}>
              <div className={styles.content}>
                  <h2 className={styles.aboutTitle}>Основание компании</h2>
                  <p className={styles.aboutText2}>В рамках спецификации современных стандартов, элементы политического процесса объективно рассмотрены соответствующими инстанциями. Следует отметить, что курс на социально-ориентированный национальный проект в значительной степени обусловливает важность глубокомысленных рассуждений. Противоположная точка зрения подразумевает, что диаграммы связей являются только методом политического участия и подвергнуты целой серии независимых исследований.</p>
              </div>
              <div className={styles.content}>
                  <h2 className={styles.aboutTitle}>Основание компании</h2>
                  <p className={styles.aboutText2}>В рамках спецификации современных стандартов, элементы политического процесса объективно рассмотрены соответствующими инстанциями. Следует отметить, что курс на социально-ориентированный национальный проект в значительной степени обусловливает важность глубокомысленных рассуждений. Противоположная точка зрения подразумевает, что диаграммы связей являются только методом политического участия и подвергнуты целой серии независимых исследований.</p>
              </div>
          </div>
          <div className={styles.history__company_center}>
              <Image src={HistoryImage} alt="Изображение года нашей истории"></Image>
          </div>
          <div className={styles.history__company_right}>
          <div className={styles.content}>
                  <h2 className={styles.aboutTitle}>Основание компании</h2>
                  <p className={styles.aboutText2}>В рамках спецификации современных стандартов, элементы политического процесса объективно рассмотрены соответствующими инстанциями. Следует отметить, что курс на социально-ориентированный национальный проект в значительной степени обусловливает важность глубокомысленных рассуждений. Противоположная точка зрения подразумевает, что диаграммы связей являются только методом политического участия и подвергнуты целой серии независимых исследований.</p>
              </div>
          </div>
        </div>
      </div>
      {/* ПРЕИМУЩЕСТВА */}
      <div className={styles.privelegyes}>
        <h2 className={styles.aboutTitle}>Почему мы?</h2>
        <div className={styles.privelegy__container}>
            <div className={styles.privelegy}>
                <Image className={styles.privelegyIcons} src={PrivelegyAssortiImage} alt="Широкий ассортимент товаров"></Image>
                <div className={styles.privelegy_content}>
                    <h3 className={styles.privelegyTitle}>Широкий ассортимент продукции</h3>
                    <p className={styles.privelegyText}>
                    В рамках спецификации современных стандартов, элементы 
                    политического процесса объективно рассмотрены соответствующими инстанциями.  
                    </p>
                </div>
            </div>

            <div className={styles.privelegy}>
                <Image className={styles.privelegyIcons} src={PrivelegySpecialImage} alt="Консультации специалистов"></Image>
                <div className={styles.privelegy_content}>
                    <h3 className={styles.privelegyTitle}>Консультации специалистов</h3>
                    <p className={styles.privelegyText}>
                    В рамках спецификации современных стандартов, элементы 
                    политического процесса объективно рассмотрены соответствующими инстанциями.  
                    </p>
                </div>
            </div>

            <div className={styles.privelegy}>
                <Image className={styles.privelegyIcons} src={PrivelegySecurityImage} alt="Безопасность и качество"></Image>
                <div className={styles.privelegy_content}>
                    <h3 className={styles.privelegyTitle}>Безопасность и качество</h3>
                    <p className={styles.privelegyText}>
                    В рамках спецификации современных стандартов, элементы 
                    политического процесса объективно рассмотрены соответствующими инстанциями.  
                    </p>
                </div>
            </div>

            <div className={styles.privelegy}>
                <Image className={styles.privelegyIcons} src={PirvelegySocialImage} alt="Социальная ответственность"></Image>
                <div className={styles.privelegy_content}>
                    <h3 className={styles.privelegyTitle}>Социальная ответственность</h3>
                    <p className={styles.privelegyText}>
                    В рамках спецификации современных стандартов, элементы 
                    политического процесса объективно рассмотрены соответствующими инстанциями.  
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}