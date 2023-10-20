import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('si')}>සිංහල</button>
    </div>
  );
};

export default LanguageSelector;
