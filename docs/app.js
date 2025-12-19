// ===============================
// Config: Backend API Base URL
// ===============================
const DEFAULT_API_BASE = "http://127.0.0.1:8000";
const API_BASE = localStorage.getItem("API_BASE") || DEFAULT_API_BASE;

let currentFormId = null;

// Small helper to show messages nicely
function showOutput(objOrText) {
  const outEl = document.getElementById("output");
  if (!outEl) return;

  if (typeof objOrText === "string") {
    outEl.textContent = objOrText;
  } else {
    outEl.textContent = JSON.stringify(objOrText, null, 2);
  }
}

// Optional helper: allow changing API base without editing code
// You can call this from browser console:
//   setApiBase("http://127.0.0.1:8000")
function setApiBase(url) {
  localStorage.setItem("API_BASE", url);
  alert("API base URL saved. Reload the page.");
}

// Create input element based on field type
function createFieldInput(field) {
  let input;

  if (field.type === "select") {
    input = document.createElement("select");
    const options = Array.isArray(field.options) ? field.options : [];
    options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      input.appendChild(o);
    });
  } else if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.rows = 4;
  } else {
    input = document.createElement("input");
    input.type = field.type || "text";
  }

  input.name = field.name || "";
  input.id = field.name || "";
  if (field.required) input.required = true;

  return input;
}

async function buildForm() {
  const categoryEl = document.getElementById("category");
  const formTitleEl = document.getElementById("formTitle");
  const formEl = document.getElementById("dynamicForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!categoryEl || !formTitleEl || !formEl || !submitBtn) {
    showOutput("UI elements not found. Check index.html ids.");
    return;
  }

  const category = categoryEl.value;

  showOutput(`Building form from: ${API_BASE}/form ...`);
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Backend error (${res.status}): ${errText}`);
    }

    const schema = await res.json();

    // Basic validation
    currentFormId = schema.form_id || null;
    const title = schema.title || "Sell Furniture";
    const fields = Array.isArray(schema.fields) ? schema.fields : [];

    if (!currentFormId) {
      showOutput({ warning: "Schema missing form_id", schema });
    } else {
      showOutput({ ok: true, form_id: currentFormId, title, field_count: fields.length });
    }

    formTitleEl.textContent = title;
    formEl.innerHTML = "";

    // Render fields dynamically
    fields.forEach(field => {
      const wrap = document.createElement("div");
      wrap.className = "row";

      const label = document.createElement("label");
      const fieldLabel = field.label || field.name || "Field";
      label.textContent = fieldLabel + (field.required ? " *" : "");
      label.htmlFor = field.name || "";

      const input = createFieldInput(field);

      wrap.appendChild(label);
      wrap.appendChild(input);
      formEl.appendChild(wrap);
    });

    submitBtn.disabled = false;
  } catch (err) {
    showOutput(
      `❌ Could not build form.\n` +
      `- Is the backend running? (uvicorn on 127.0.0.1:8000)\n` +
      `- Is Ollama running? (ollama serve)\n\n` +
      `Error: ${err.message}`
    );
  }
}

async function submitForm() {
  const formEl = document.getElementById("dynamicForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!formEl || !submitBtn) {
    showOutput("Form elements not found. Check index.html ids.");
    return;
  }

  if (!currentFormId) {
    showOutput("❌ No form_id set. Click 'Build Form' first.");
    return;
  }

  // Gather values
  const data = {};
  [...formEl.elements].forEach(el => {
    if (el.name) data[el.name] = el.value;
  });

  showOutput(`Submitting listing to: ${API_BASE}/submit ...`);
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_id: currentFormId, data }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Backend error (${res.status}): ${errText}`);
    }

    const out = await res.json();
    showOutput(out);
  } catch (err) {
    showOutput(
      `❌ Submit failed.\n` +
      `Error: ${err.message}`
    );
  } finally {
    submitBtn.disabled = false;
  }
}

// Hook up buttons
document.getElementById("build")?.addEventListener("click", buildForm);
document.getElementById("submitBtn")?.addEventListener("click", submitForm);

// Optional: show current API base on load (useful for GitHub Pages)
showOutput(`Ready. API_BASE = ${API_BASE}\nTip: setApiBase("http://127.0.0.1:8000") then reload.`);
