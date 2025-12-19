from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

def generate_form_schema(category: str) -> dict:
    prompt = f"""
You are generating a JSON form schema for listing a used furniture item for sale.
Return ONLY valid JSON.

Requirements:
- Top-level keys: form_id, title, fields
- fields is a list of objects with: name, label, type, required
- type must be one of: text, textarea, number, select, email, tel
- include common fields + category-specific fields for: {category}

Also include contact fields: contact_name, contact_email, contact_phone (optional).

Example field:
{{"name":"price","label":"Price (USD)","type":"number","required":true}}
"""

    resp = client.chat.completions.create(
        model="llama3.2:3b",
        messages=[
            {"role": "system", "content": "Return only JSON. No markdown. No explanation."},
            {"role": "user", "content": prompt}
        ]
    )
    text = resp.choices[0].message.content.strip()

    # basic cleanup if model adds code fences
    text = text.replace("```json", "").replace("```", "").strip()

    import json
    return json.loads(text)
