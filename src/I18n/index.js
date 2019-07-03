import i18n from 'i18next';
import * as RNLocalize from 'react-native-localize';
import { initReactI18next } from 'react-i18next';

// Translations
import en from './en.json';
import ar from './ar.json';

const locales = RNLocalize.getLocales();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: Array.isArray(locales) ? locales[0].languageCode : 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
