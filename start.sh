#!/bin/bash

if ! command -v uvicorn &> /dev/null; then
    echo "Error: uvicorn command not found"
    exit 1
fi

exec uvicorn "app:app" --log-level info --port 8080 --reload