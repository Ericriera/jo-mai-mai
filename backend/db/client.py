from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from google.cloud import firestore

from backend.core.config import get_settings


def _build_firestore_client() -> firestore.Client:
    settings = get_settings()
    project = settings.google_cloud_project
    credentials_path = settings.google_application_credentials

    if credentials_path:
        return firestore.Client.from_service_account_json(
            credentials_path,
            project=project,
        )

    local_credentials_path = Path(settings.local_credentials_path)

    if local_credentials_path.exists():
        return firestore.Client.from_service_account_json(
            str(local_credentials_path),
            project=project,
        )

    return firestore.Client(project=project)


@lru_cache
def get_db_client() -> firestore.Client:
    return _build_firestore_client()
