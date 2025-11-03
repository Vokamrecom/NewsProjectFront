import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "news": "News",
      "login": "Login",
      "logout": "Logout",
      "admin": "Admin Panel",
      "addNews": "Add News",
      "editNews": "Edit News",
      "deleteNews": "Delete News",
      "title": "Title",
      "subtitle": "Subtitle",
      "content": "Content",
      "imageUrl": "Image URL",
      "save": "Save",
      "cancel": "Cancel",
      "loading": "Loading...",
      "email": "Email",
      "password": "Password",
      "rememberMe": "Remember me",
      "readMore": "Read More",
      "loadMore": "Load more",
      "noNews": "No news available",
      "latestNews": "Latest News",
      "allNews": "All News",
      "language": "Language",
      "register": "Register"
    }
  },
  ru: {
    translation: {
      "home": "Главная",
      "news": "Новости",
      "login": "Войти",
      "logout": "Выйти",
      "admin": "Панель администратора",
      "addNews": "Добавить новость",
      "editNews": "Редактировать новость",
      "deleteNews": "Удалить новость",
      "title": "Заголовок",
      "subtitle": "Подзаголовок",
      "content": "Текст",
      "imageUrl": "URL изображения",
      "save": "Сохранить",
      "cancel": "Отмена",
      "loading": "Загрузка...",
      "email": "Email",
      "password": "Пароль",
      "rememberMe": "Запомнить меня",
      "readMore": "Читать далее",
      "loadMore": "Загрузить еще",
      "noNews": "Новостей нет",
      "latestNews": "Последние новости",
      "allNews": "Все новости",
      "language": "Язык",
      "register": "Регистрация"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

