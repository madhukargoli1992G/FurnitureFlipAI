## **Project idea**

FurnitureFlip AI (or any name):
A seller chooses a furniture category → your backend uses Ollama to generate a dynamic form schema + optional description/price suggestions → UI renders the form → submit saves listing locally (JSON/SQLite).


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## **Run instructions:**

## 1) Start Ollama + model##

**Code:**

ollama pull llama3.2:3b

## 2) Start backend##

**Code:**

cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload


## 3) Open frontend##

Open frontend/index.html in your browser.


----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

“My backend is an agent service.”

“It uses an LLM (Ollama) to generate a form schema dynamically.”

“The UI is a schema-driven renderer.”

“Tools are simply functions; here the tool is generate_form_schema() and storage.”

If you later switch to actual MAF primitives, the architecture stays the same.