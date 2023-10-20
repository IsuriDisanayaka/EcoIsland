import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Pass react-i18next to i18next
  .init({
    resources: {
      en: {
        translation: require('./i18n/en/translation.json'),
      },
      si: {
        translation: require('./i18n/si/translation.json'),
      },
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already handles the escape
    },
  });

export default i18n;
