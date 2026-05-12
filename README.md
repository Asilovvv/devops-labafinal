# Full-Stack на DigitalOcean

Проект для лабораторной работы:

- Frontend: React + Vite
- Backend: Flask API
- Database: PostgreSQL
- Reverse Proxy: Nginx
- Deployment: Docker Compose на DigitalOcean Droplet
- Auto Deploy: GitHub Actions через SSH

## Архитектура

На одном Droplet запускаются 4 Docker контейнера:

1. Frontend container — port 3000
2. Backend container — port 5000
3. PostgreSQL container — port 5432
4. Nginx container — port 80

Nginx работает как reverse proxy:

- `/` → frontend
- `/api` → backend

## Локальный запуск

```bash
docker compose up -d --build
```

Открыть:

```text
http://localhost
```

Проверить API:

```bash
curl http://localhost/api/health
curl http://localhost/api/data
```

## Команды для DigitalOcean Droplet

Подключиться:

```bash
ssh root@YOUR_SERVER_IP
```

Обновить сервер:

```bash
apt update && apt upgrade -y
```

Установить Docker:

```bash
apt install -y docker.io docker-compose-plugin git
systemctl enable docker
systemctl start docker
```

Клонировать проект:

```bash
cd /root
git clone https://github.com/YOUR_USERNAME/fullstack-digitalocean-lab.git
cd fullstack-digitalocean-lab
```

Запустить контейнеры:

```bash
docker compose up -d --build
```

Проверить контейнеры:

```bash
docker ps
```

Должно быть 4 контейнера:

- lab_frontend
- lab_backend
- lab_postgres
- lab_nginx

Открыть в браузере:

```text
http://YOUR_SERVER_IP
```

## Firewall

Разрешить SSH и HTTP:

```bash
ufw allow OpenSSH
ufw allow 80
ufw enable
ufw status
```

## GitHub Actions Secrets

В GitHub открой:

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

Добавь:

```text
SERVER_IP = IP адрес Droplet
SSH_PRIVATE_KEY = приватный SSH ключ
```

## Что сдавать преподавателю

1. GitHub repository URL
2. IP адрес Droplet
3. Скриншот `docker ps`
4. Скриншот успешного GitHub Actions deploy
# devops-labafinal
