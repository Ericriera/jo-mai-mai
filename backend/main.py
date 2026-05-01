import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import questions, suggestions


app = FastAPI()


def _parse_csv_env(name: str, default: str) -> list[str]:
    value = os.getenv(name, default)
    return [item.strip() for item in value.split(",") if item.strip()]


def _parse_bool_env(name: str, default: str = "false") -> bool:
    return os.getenv(name, default).lower() in {"1", "true", "yes", "on"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=_parse_csv_env("CORS_ALLOWED_ORIGINS", "*"),
    allow_credentials=_parse_bool_env("CORS_ALLOW_CREDENTIALS"),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}


app.include_router(questions.router)
app.include_router(suggestions.router)
