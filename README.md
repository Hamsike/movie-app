# 🎬 MovieApp

Приложение для просмотра, поиска и сравнения фильмов с использованием API Кинопоиска.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-purple)
![React Query](https://img.shields.io/badge/React_Query-5.12-orange)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Demo

[👉 Попробовать приложение в действии](https://ваш-ник.github.io/movie-app)

## 🚀 Функциональность

| Функция | Описание |
|---------|----------|
| 📱 **Популярные фильмы** | Бесконечная прокрутка с ленивой загрузкой |
| 🔍 **Поиск с фильтрами** | Фильтрация по году, жанру и рейтингу |
| ⭐ **Избранное** | Сохранение фильмов в localStorage |
| 🔄 **Сравнение** | Сравнение до 2 фильмов с детальной таблицей |
| 📄 **Детальная страница** | Полная информация о фильме |
| 🎨 **Тёмная тема** | Комфортный просмотр в темноте |
| 📱 **Адаптивный дизайн** | Работает на всех устройствах |

## 🛠️ Технологии

| Технология | Описание |
|------------|----------|
| **React 18** | Библиотека для пользовательских интерфейсов |
| **TypeScript** | Статическая типизация |
| **Vite** | Быстрая сборка и разработка |
| **Redux Toolkit + Redux Persist** | Управление состоянием и сохранение избранного |
| **React Query** | Кеширование API запросов |
| **React Router v6** | Маршрутизация |
| **Axios** | HTTP запросы |
| **CSS Modules** | Модульная стилизация |

## 📦 Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Hamsike/movie-app.git
cd movie-app

### 2.  Установите зависимости
```bash
npm install

### 3. Настройте переменные окружения
Откройте файл .env.default и добавьте ваш API ключ:
VITE_API_KEY=ваш_ключ_api_кинопоиска
Важно: API ключ можно получить на kinopoisk.dev

### 4. Запустите приложение в режиме разработки
```bash
npm run dev