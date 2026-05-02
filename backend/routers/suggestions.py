from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Response, status

from backend.db.client import get_db_client
from backend.db.models.suggestion import Suggestion
from backend.db.repository import FirestoreRepository
from backend.db.schemas.suggestion import (
    full_suggestion_schema,
    suggestions_schema,
)

router = APIRouter(prefix="/suggestions", tags=["suggestions"])


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_suggestion_repository() -> FirestoreRepository:
    return FirestoreRepository(
        get_db_client(),
        collection_name="suggestions",
        missing_detail="The suggestion does not exist",
    )


@router.get("/", response_model=list[dict])
async def get_suggestions(
    repository: FirestoreRepository = Depends(get_suggestion_repository),
) -> list[dict]:
    documents = repository.list()
    return suggestions_schema(documents)


@router.get("/{id}", response_model=Suggestion)
async def get_suggestion(
    id: str,
    repository: FirestoreRepository = Depends(get_suggestion_repository),
) -> Suggestion:
    return Suggestion(**full_suggestion_schema(repository.get(id)))


@router.post("/", response_model=Suggestion, status_code=status.HTTP_201_CREATED)
async def post_suggestion(
    suggestion: Suggestion,
    repository: FirestoreRepository = Depends(get_suggestion_repository),
) -> Suggestion:
    payload = suggestion.model_dump()
    payload.pop("id", None)
    payload["created_at"] = _utc_now_iso()
    return Suggestion(**full_suggestion_schema(repository.create(payload)))


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
)
async def delete_suggestion(
    id: str,
    repository: FirestoreRepository = Depends(get_suggestion_repository),
) -> Response:
    repository.delete(id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
