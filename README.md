# Task Manager 2.0

Task Manager - это приложение для управления задачами и списками, построенное на React, Node.js и PostgreSQL.

## Требования

### Для запуска через Docker (рекомендуется)

- **Docker** версии 20.10 или выше
- **Docker Compose** версии 2.0 или выше

> **Важно:** При запуске через Docker **не требуется** установка Node.js, npm, PostgreSQL или других зависимостей на вашем компьютере. Все необходимое будет установлено и запущено внутри Docker-контейнеров.

### Для локальной разработки

- **Node.js** версии 20 или выше
- **npm** или **yarn**
- **PostgreSQL** (или используйте Docker только для базы данных)

## Запуск с помощью Docker

> **Идеально для:** Быстрого запуска проекта без установки зависимостей на вашем компьютере. Все необходимое (Node.js, npm, PostgreSQL, Nginx) уже включено в Docker-образы.

### Быстрый старт

1. **Убедитесь, что Docker и Docker Compose установлены:**

   ```bash
   docker --version
   docker-compose --version
   ```

2. **Соберите и запустите все сервисы:**

   ```bash
   docker-compose up --build
   ```

3. **Приложение будет доступно:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - PostgreSQL: localhost:5432

> **Примечание:** При первом запуске сборка может занять несколько минут, так как Docker загружает базовые образы и устанавливает все зависимости. Последующие запуски будут быстрее благодаря кэшированию.

### Остановка

```bash
docker-compose down
```

### Остановка с удалением данных

```bash
docker-compose down -v
```

### Запуск в фоновом режиме

```bash
docker-compose up -d --build
```

### Просмотр логов

```bash
docker-compose logs -f
```

Просмотр логов конкретного сервиса:

```bash
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres
```

## Локальная разработка

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

Запуск сервера и клиента одновременно:

```bash
npm run dev
```

Или запуск отдельно:

**Backend сервер:**

```bash
cd apps/server
npm run dev
```

**Frontend клиент:**

```bash
cd apps/client
npm run dev
```

### Переменные окружения

Для локальной разработки создайте файл `.env` в корне проекта или в `apps/server`:

```env
DB_PASSWORD=postgres
DB_HOST=localhost
DB_USER=postgres
DB_NAME=task_manager
DB_PORT=5432
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PORT=8000
```

**Важно:** Убедитесь, что PostgreSQL запущен локально или используйте Docker для базы данных:

```bash
docker-compose up postgres -d
```

### Сборка для production

**Backend:**

```bash
cd apps/server
npm run build
npm start
```

**Frontend:**

```bash
cd apps/client
npm run build
npm run preview
```

## Структура проекта

```
task-manager-2.0/
├── apps/
│   ├── client/          # Frontend приложение (React + Vite)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── api/         # RTK Query API
│   │   │   │   ├── features/    # Компоненты фич
│   │   │   │   ├── hooks/       # React хуки
│   │   │   │   ├── store/       # Redux store
│   │   │   │   ├── ui/          # UI компоненты
│   │   │   │   └── utils/       # Утилиты
│   │   └── package.json
│   └── server/          # Backend API (Node.js + Express)
│       ├── src/
│       │   ├── controllers/    # Контроллеры
│       │   ├── db/             # Настройка БД
│       │   ├── repo/           # Репозитории
│       │   ├── routes/         # Маршруты API
│       │   ├── services/       # Бизнес-логика
│       │   └── utils/          # Утилиты
│       └── package.json
├── shared/              # Общие типы TypeScript
│   └── types/
├── docker-compose.yml   # Docker Compose конфигурация
├── Dockerfile           # Dockerfile для сервера
├── Dockerfile.client    # Dockerfile для клиента
├── nginx.conf           # Nginx конфигурация
└── package.json         # Корневой package.json
```

## Технологии

- **Frontend:**
  - React 19
  - Redux Toolkit + RTK Query
  - TypeScript
  - Vite
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - TypeScript

- **Инфраструктура:**
  - Docker & Docker Compose
  - Nginx (для production клиента)
