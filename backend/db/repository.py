from __future__ import annotations

from typing import Any

from google.cloud.firestore_v1.base_document import DocumentSnapshot
from google.cloud.firestore_v1.base_query import BaseFilter


class DocumentNotFoundError(Exception):
    def __init__(self, detail: str) -> None:
        super().__init__(detail)
        self.detail = detail


class FirestoreRepository:
    def __init__(self, client: Any, collection_name: str, missing_detail: str) -> None:
        self._collection = client.collection(collection_name)
        self._missing_detail = missing_detail

    def list(self, *, field_filter: BaseFilter | None = None) -> list[dict[str, Any]]:
        query = (
            self._collection.where(filter=field_filter)
            if field_filter is not None
            else self._collection
        )
        return [self._serialize(snapshot) for snapshot in query.stream()]

    def get(self, document_id: str) -> dict[str, Any]:
        snapshot = self._collection.document(document_id).get()
        if not snapshot.exists:
            raise DocumentNotFoundError(self._missing_detail)

        return self._serialize(snapshot)

    def create(self, payload: dict[str, Any]) -> dict[str, Any]:
        _, reference = self._collection.add(payload)
        return self.get(reference.id)

    def update(self, document_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        document = self._collection.document(document_id)
        snapshot = document.get()

        if not snapshot.exists:
            raise DocumentNotFoundError(self._missing_detail)

        document.set(payload)
        return self.get(document_id)

    def delete(self, document_id: str) -> None:
        document = self._collection.document(document_id)
        snapshot = document.get()

        if not snapshot.exists:
            raise DocumentNotFoundError(self._missing_detail)

        document.delete()

    @staticmethod
    def _serialize(snapshot: DocumentSnapshot) -> dict[str, Any]:
        return {"id": snapshot.id, **(snapshot.to_dict() or {})}
