import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    "Home": "Home",
    "Dashboard": "Dashboard",
    "Upload Image": "Upload Image",
    "Request Pickup": "Request Pickup",
    "Settings": "Settings",
    "Help": "Help",
    "Profile": "Profile",
    "Logout": "Logout",
    "My Activity": "My Activity",
    "Account Info": "Account Info",
    "Language": "Language"
  },
  kn: {
    "Home": "ಮುಖಪುಟ",
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Upload Image": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "Request Pickup": "ಪಿಕಪ್ ವಿನಂತಿಸಿ",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Help": "ಸಹಾಯ",
    "Profile": "ಪ್ರೊಫೈಲ್",
    "Logout": "ಲಾಗ್ ಔಟ್",
    "My Activity": "ನನ್ನ ಚಟುವಟಿಕೆ",
    "Account Info": "ಖಾತೆ ಮಾಹಿತಿ",
    "Language": "ಭಾಷೆ"
  },
  hi: {
    "Home": "होम",
    "Dashboard": "डैशबोर्ड",
    "Upload Image": "छवि अपलोड करें",
    "Request Pickup": "पिकअप का अनुरोध करें",
    "Settings": "सेटिंग्स",
    "Help": "मदद",
    "Profile": "प्रोफ़ाइल",
    "Logout": "लॉग आउट",
    "My Activity": "मेरी गतिविधि",
    "Account Info": "खाता जानकारी",
    "Language": "भाषा"
  }
};

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    localStorage.setItem('language', 'en');
  }, []);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    if (['en', 'kn', 'hi'].includes(lang)) {
        setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
