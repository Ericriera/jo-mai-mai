def full_suggestion_schema(suggestion: dict) -> dict:
    return {
        "id": suggestion["id"],
        "suggestion": suggestion["suggestion"],
        "category": suggestion["category"],
        "created_at": suggestion["created_at"],
    }


def suggestion_schema(suggestion: dict) -> dict:
    return {
        "id": suggestion["id"],
        "suggestion": suggestion["suggestion"],
        "category": suggestion["category"],
    }


def suggestions_schema(suggestions: list[dict]) -> list[dict]:
    return [suggestion_schema(suggestion) for suggestion in suggestions]
