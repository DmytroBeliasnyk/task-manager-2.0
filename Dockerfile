# Multi-stage build для оптимизации размера образа

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/
COPY shared ./shared
COPY tsconfig.base.json ./

# Копируем конфигурационные файлы
COPY apps/server/tsconfig.json ./apps/server/
COPY apps/client/tsconfig*.json ./apps/client/
COPY apps/client/vite.config.ts ./apps/client/

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY apps/server/src ./apps/server/src
COPY apps/client/src ./apps/client/src
COPY apps/client/index.html ./apps/client/

# Собираем сервер
WORKDIR /app/apps/server
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Копируем package.json и package-lock.json для сервера
COPY package*.json ./
COPY apps/server/package.json ./apps/server/

# Устанавливаем только production зависимости для сервера
WORKDIR /app/apps/server
RUN npm install --omit=dev

# Копируем собранные файлы сервера
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/shared ../../shared

# Остаемся в директории сервера для правильной работы путей
WORKDIR /app/apps/server

EXPOSE 8000

CMD ["node", "dist/apps/server/src/index.js"]

