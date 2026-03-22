# 🎬 MovieApp

Приложение для просмотра, поиска и сравнения фильмов с использованием API Кинопоиска.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-purple)
![React Query](https://img.shields.io/badge/React_Query-5.12-orange)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Demo

[👉 Попробовать приложение в действии](https://hamsike.github.io/movie-app)

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
```
### 2.  Установите зависимости
```bash
npm install
```

## 🔑 Настройка API ключа

### 1. Получите API ключ
- Перейдите на [kinopoisk.dev](https://kinopoisk.dev/)
- Зарегистрируйтесь или войдите
- Нажмите **"Получить ключ"**
- Скопируйте полученный ключ

### 2. Настройте переменные окружения

Создайте файл `.env` на основе `.env.default`:

```bash
# macOS / Linux
cp .env.default .env

# Windows (Command Prompt)
copy .env.default .env

# Windows (PowerShell)
Copy-Item .env.default .env
```
Откройте файл `.env` и при необходимости замените API ключ:
```bash
VITE_API_KEY=ваш_ключ_api_кинопоиска  # Вставьте ваш ключ
VITE_API_URL=https://api.kinopoisk.dev
```

## 🔑 Запуск

### 1. Запустите приложение в режиме разработки
```bash
npm run dev
```