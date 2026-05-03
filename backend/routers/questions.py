from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Query, Response, status
from google.cloud.firestore_v1.base_query import FieldFilter

from db.client import get_db_client
from db.models.question import Question
from db.repository import FirestoreRepository
from db.schemas.question import full_question_schema, questions_schema

router = APIRouter(prefix="/questions", tags=["questions"])


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_question_repository() -> FirestoreRepository:
    return FirestoreRepository(
        get_db_client(),
        collection_name="questions",
        missing_detail="The question does not exist",
    )

@router.get("/", response_model=list[dict])
async def get_questions(
    category: str | None = Query(default=None, min_length=1),
    repository: FirestoreRepository = Depends(get_question_repository),
) -> list[dict]:
    documents = repository.list(
        field_filter=FieldFilter("categories", "array_contains", category)
        if category
        else None
    )
    return questions_schema(documents)


@router.get("/{id}", response_model=Question)
async def get_question(
    id: str,
    repository: FirestoreRepository = Depends(get_question_repository),
) -> Question:
    return Question(**full_question_schema(repository.get(id)))


@router.post("/", response_model=Question, status_code=status.HTTP_201_CREATED)
async def post_question(
    question: Question,
    repository: FirestoreRepository = Depends(get_question_repository),
) -> Question:
    timestamp = _utc_now_iso()
    payload = question.model_dump()
    payload.pop("id", None)
    payload["created_at"] = timestamp
    payload["updated_at"] = timestamp
    return Question(**full_question_schema(repository.create(payload)))


@router.put("/", response_model=Question)
async def put_question(
    question: Question,
    repository: FirestoreRepository = Depends(get_question_repository),
) -> Question:
    existing = repository.get(question.id)
    payload = question.model_dump(exclude={"id"})
    payload["created_at"] = existing["created_at"]
    payload["updated_at"] = _utc_now_iso()
    return Question(**full_question_schema(repository.update(question.id, payload)))


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
)
async def delete_question(
    id: str,
    repository: FirestoreRepository = Depends(get_question_repository),
) -> Response:
    repository.delete(id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
