from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    app_name: str = "Jo Mai Mai API"
    app_description: str = (
        'API for the "Never Have I Ever" game built with FastAPI and Firestore.'
    )
    app_host: str = "127.0.0.1"
    app_port: int = 8000
    app_reload: bool = False

    cors_allowed_origins: list[str] = Field(default_factory=lambda: ["*"])
    cors_allow_credentials: bool = False

    google_application_credentials: str | None = None
    google_cloud_project: str | None = None

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @field_validator("cors_allowed_origins", mode="before")
    @classmethod
    def parse_cors_allowed_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, list):
            return value

        return [item.strip() for item in value.split(",") if item.strip()]

    @property
    def local_credentials_path(self) -> Path:
        return BASE_DIR / "serviceAccountKey.json"


@lru_cache
def get_settings() -> Settings:
    return Settings()
