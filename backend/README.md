# Jo Mai Mai API
Jo Mai Mai API is a FastAPI backend for the popular game "Never Have I Ever".

## Getting Started

1. Create and activate a virtual environment.

```zsh
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies.

```zsh
pip install -r requirements.txt
```

3. Copy the environment file and adjust it if needed.

```zsh
cp .env.example .env
```

4. Start the API from the project root.

```zsh
fastapi dev main.py
```

If you prefer the Python entrypoint instead of the CLI:

```zsh
python -m main
```

5. Open the local API docs at [http://localhost:8000/docs](http://localhost:8000/docs).
