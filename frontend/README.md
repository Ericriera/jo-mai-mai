# Frontend

This folder contains the Expo app for Jo Mai Mai.

## Requirements

- Node.js 20.19+
- npm

## Local Setup

Run everything from the `frontend/` directory.

1. Install dependencies.

```zsh
npm install
```

2. Create your local env file.

```zsh
cp .env.example .env
```

3. Start the Expo development server.

```zsh
npm run start
```

## Useful Commands

```zsh
npm run android
npm run ios
npm run web
npm run doctor
```

## Expo Go

The project uses the local Expo CLI workflow through `npx expo ...`.

If you test on a physical iPhone, make sure your installed Expo Go version matches the SDK used by the project.

## Environment Variables

Example values live in [.env.example](./.env.example).

Main variable:

- `EXPO_PUBLIC_API_URL`

## Docker

Build the web image from the repository root:

```zsh
docker build -t jo-mai-mai-web ./frontend
```

Run it with a frontend env file:

```zsh
docker run --rm -p 8080:80 --env-file frontend/.env jo-mai-mai-web
```

At container startup, the image generates runtime web config from the container environment, so `EXPO_PUBLIC_API_URL` can change between deployments without rebuilding the image.

## Web Runtime

The web image is exported with Expo and served by Nginx.

- `nginx.conf` handles SPA routing
- `entrypoint.sh` generates the runtime `env.js`
- `src/config/api.js` reads the runtime API base URL
