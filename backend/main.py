from __future__ import annotations

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import get_settings
from backend.db.repository import DocumentNotFoundError
from backend.routers import questions, suggestions


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        description=settings.app_description,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allowed_origins,
        allow_credentials=settings.cors_allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.exception_handler(DocumentNotFoundError)
    async def document_not_found_handler(_, exc: DocumentNotFoundError) -> JSONResponse:
        return JSONResponse(status_code=404, content={"detail": exc.detail})

    @app.get("/health", tags=["health"])
    async def health_check() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(questions.router)
    app.include_router(suggestions.router)

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    settings = get_settings()
    uvicorn.run(
        "backend.main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=settings.app_reload,
    )
