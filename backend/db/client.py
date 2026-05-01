import os
from pathlib import Path

from google.cloud import firestore


def _build_firestore_client():
    project = os.getenv("GOOGLE_CLOUD_PROJECT")
    credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    if credentials_path:
        return firestore.Client.from_service_account_json(
            credentials_path,
            project=project,
        )

    local_credentials_path = (
        Path(__file__).resolve().parents[1] / "serviceAccountKey.json"
    )

    if local_credentials_path.exists():
        return firestore.Client.from_service_account_json(
            str(local_credentials_path),
            project=project,
        )

    return firestore.Client(project=project)


db_client = _build_firestore_client()
