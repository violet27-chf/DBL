import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';
import de from './locales/de.json';
import hi from './locales/hi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ja: { translation: ja },
      ru: { translation: ru },
      de: { translation: de },
      hi: { translation: hi }
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 