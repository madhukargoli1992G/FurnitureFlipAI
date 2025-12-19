from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from ollama_agent import generate_form_schema
from storage import save_listing

app = FastAPI()

# allow frontend to call backend locally
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormRequest(BaseModel):
    category: str

class SubmitRequest(BaseModel):
    form_id: str
    data: Dict[str, Any]

@app.post("/form")
def get_form(req: FormRequest):
    schema = generate_form_schema(req.category)
    return schema

@app.post("/submit")
def submit(req: SubmitRequest):
    listing_id = save_listing({"form_id": req.form_id, **req.data})
    return {"status": "ok", "listing_id": listing_id}
