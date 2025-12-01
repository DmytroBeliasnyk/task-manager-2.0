# Task Manager 2.0

## Запуск с помощью Docker

### Быстрый старт

1. **Соберите и запустите все сервисы:**
   ```bash
   docker-compose up --build
   ```

2. **Приложение будет доступно:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - PostgreSQL: localhost:5432

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

## Структура проекта

- **PostgreSQL** - база данных
- **Server** - backend API (Node.js)
- **Client** - frontend приложение (React + Vite)

