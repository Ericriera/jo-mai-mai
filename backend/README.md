# Backend

This folder contains the FastAPI API for Jo Mai Mai.

## Requirements

- Python 3.12+

## Local Setup

Run everything from the `backend/` directory.

1. Create and activate a virtual environment.

```zsh
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies.

```zsh
pip install -r requirements.txt
```

3. Create your local env file.

```zsh
cp .env.example .env
```

4. Start the API.

```zsh
fastapi dev main.py
```

Alternative entrypoint:

```zsh
python -m main
```

## API Docs

Once the server is running:

```text
http://localhost:8000/docs
```

## Environment Variables

Example values live in [.env.example](./.env.example).

Main variables:

- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `CORS_ALLOWED_ORIGINS`
- `CORS_ALLOW_CREDENTIALS`

## Docker

Build the image from the repository root:

```zsh
docker build -t jo-mai-mai-backend ./backend
```

Run it with your backend env file:

```zsh
docker run --rm -p 8000:8000 \
  --env-file backend/.env \
  -v "$(pwd)/backend/serviceAccountKey.json:/run/secrets/firebase-service-account.json:ro" \
  jo-mai-mai-backend
```

This matches the default path used in [.env.example](./.env.example):

```text
/run/secrets/firebase-service-account.json
```

If your credentials are provided by the host environment instead, you can omit the volume mount and set `GOOGLE_APPLICATION_CREDENTIALS` to the path available inside your runtime.
