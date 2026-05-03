# Jo Mai Mai

![App Screenshot](https://github.com/ericriera/MyPortfolio/blob/main/img/jomaimai.png)

Jo Mai Mai is a full-stack "Never Have I Ever" app with:

- a FastAPI backend backed by Google Firestore
- an Expo / React Native frontend for mobile and web
- Dockerfiles for backend and frontend images
- GitHub Actions workflows that build and publish both images to GHCR

## Repository Structure

```text
backend/   FastAPI API, Firestore integration, Dockerfile
frontend/  Expo app, web export, Dockerfile and Nginx runtime setup
.github/   CI workflows for backend and frontend images
```

## Tech Stack

- Backend: FastAPI, Pydantic Settings, Google Cloud Firestore
- Frontend: Expo SDK 54, React Native, React Navigation
- Containers: Docker
- Registry / CI: GitHub Actions + GitHub Container Registry

## Local Development

The backend and frontend are designed to run independently during development.

### Backend

```zsh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
fastapi dev main.py
```

API docs:

```text
http://localhost:8000/docs
```

### Frontend

```zsh
cd frontend
npm install
cp .env.example .env
npm run start
```

Useful commands:

```zsh
npm run android
npm run ios
npm run web
npm run doctor
```

## Docker Images

### Backend image

```zsh
docker build -t jo-mai-mai-backend ./backend
docker run --rm -p 8000:8000 \
  --env-file backend/.env \
  -v "$(pwd)/backend/serviceAccountKey.json:/run/secrets/firebase-service-account.json:ro" \
  jo-mai-mai-backend
```

### Frontend web image

```zsh
docker build -t jo-mai-mai-web ./frontend
docker run --rm -p 8080:80 --env-file frontend/.env jo-mai-mai-web
```

The frontend container injects `EXPO_PUBLIC_API_URL` at container startup, so the same image can be reused across environments.

## CI

The repository includes two GitHub Actions workflows:

- `backend-image.yml`: builds and publishes the backend image when `backend/**` changes
- `frontend-image.yml`: builds and publishes the frontend image when `frontend/**` changes

Published images:

- `ghcr.io/ericriera/jo-mai-mai-backend`
- `ghcr.io/ericriera/jo-mai-mai-frontend`

## Environment Variables

### Backend

Main variables:

- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `CORS_ALLOWED_ORIGINS`
- `CORS_ALLOW_CREDENTIALS`

### Frontend

Main variable:

- `EXPO_PUBLIC_API_URL`
