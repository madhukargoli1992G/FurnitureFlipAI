### Author

Madhukar Goli
Graduate Student — Business Analytics
AI / Agent Systems / Data Analytics


# 🪑 FurnitureSell AI — Dynamic Listing UI with Local Agent (Ollama)

A full-stack AI project that demonstrates how to build a **dynamic, schema-driven user interface** powered by an **agent-style backend** using a **local LLM (Ollama)** — with **no paid APIs**.

This project showcases how an AI agent can dynamically generate form schemas based on user intent (e.g., selling a sofa vs a bed) and drive a responsive UI experience.

---

## 🚀 Project Overview

When a user wants to sell a piece of furniture:

1. The user selects a furniture category (Sofa, Chair, Table, etc.)
2. A **Python agent backend** uses a local LLM (Ollama) to:
   - Generate a **JSON form schema** dynamically
   - Add category-specific fields
3. The **frontend UI renders the form dynamically** from the schema
4. The completed listing is submitted and stored locally as JSON

This architecture mirrors real-world **agent frameworks** used in production systems.

---

## 🧠 Key Concepts Demonstrated

- Agent-driven UI generation (schema-first design)
- Tool-using AI agents (LLM → structured output)
- Local LLM inference using **Ollama**
- Backend service with **FastAPI**
- Dynamic frontend rendering (no hard-coded forms)
- Clean separation of **UI / Agent / Storage**
- No cloud deployment, no paid APIs

---

## 🏗️ Tech Stack

### Backend
- **Python 3.11+**
- **FastAPI** — API service
- **Ollama** — local LLM runtime
- **OpenAI-compatible client** (local endpoint)
- **Pydantic** — request/response validation

### Frontend
- HTML / CSS / JavaScript
- Schema-driven dynamic form rendering

### Model
- `llama3.2:3b` (local, free, lightweight)

---

## 📁 Project Structure
```bash
FurnitureFlipAI/
├── backend/
│   ├── app.py              ✅ FastAPI entry point
│   ├── ollama_agent.py     ✅ Agent logic (LLM → schema)
│   ├── storage.py          ✅ Persistence layer
│   ├── schemas.py          ✅ (optional, good practice)
│   ├── requirements.txt
│   └── listings/
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── README.md
├── RUN_Instructions.md
├── .gitignore
└── LICENSE
```

```bash
furniture-sell-agent/
├── backend/
│ ├── app.py # FastAPI application
│ ├── ollama_agent.py # LLM agent logic (schema generation)
│ ├── storage.py # Local JSON storage
│ ├── requirements.txt
│ └── listings/ # Generated at runtime
│
├── frontend/
│ ├── index.html # UI entry point
│ ├── app.js # Dynamic form renderer
│ └── styles.css
│
├── .gitignore
└── README.md
```

---

## ▶️ How to Run the Project (Local)

### 1️⃣ Install Ollama and pull the model

```bash

ollama pull llama3.2:3b
```

2️⃣ Start the backend (FastAPI)

```bash

cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload

```
Backend will run at:

http://127.0.0.1:8000

### 3️⃣ Open the frontend

```bash 

frontend/index.html

```
### **Example Flow**

Select Sofa

Click Build Form

Form dynamically updates with sofa-specific fields

Enter item + contact details

Click Submit Listing

Listing saved to backend/listings/<timestamp>.json

### **Why This Project Matters**

This project demonstrates real agent architecture, not just chatbots:

Agents don’t just answer questions — they drive application behavior

UI becomes flexible and adaptive

Backend logic stays clean and scalable

Easy to extend into:

Marketplaces

Onboarding flows

Configuration tools

Admin dashboards

### **Future Enhancements**

Image upload & moderation

Price suggestions via agent tools

SQLite / PostgreSQL storage

Authentication

Multi-step conversational UI

Deployment with Docker

### **Notes

.venv/ and generated listings are ignored via .gitignore

Ollama must be running locally for the agent to work

No external APIs or paid services are required