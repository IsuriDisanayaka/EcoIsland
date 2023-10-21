import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./dropdown.css";

function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <div className="language-dropdown">
      <button
        className={"english_button" + (selectedLanguage === "en" ? " selected" : "")}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className={"language-button" + (selectedLanguage === "si" ? " selected" : "")}
        onClick={() => changeLanguage("si")}
      >
        සිංහල
      </button>
      <button
        className={"tamillanguage-button" + (selectedLanguage === "tl" ? " selected" : "")}
        onClick={() => changeLanguage("tl")}
      >
        தமிழ்
      </button>
    </div>
  );
}

export default LanguageDropdown;
