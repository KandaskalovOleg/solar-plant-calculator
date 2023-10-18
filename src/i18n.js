import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import ukTranslations from './locales/uk.json';

const options = {
  order: ['navigator', 'localStorage', 'querystring', 'cookie', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
};

i18n
  .use(LanguageDetector)
  .init({
    detection: options,
    resources: {
      en: {
        translation: enTranslations,
      },
      uk: {
        translation: ukTranslations,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
