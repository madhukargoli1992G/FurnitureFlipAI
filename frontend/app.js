let currentFormId = null;

async function buildForm() {
  const category = document.getElementById("category").value;

  const res = await fetch("http://127.0.0.1:8000/form", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ category })
  });

  const schema = await res.json();
  currentFormId = schema.form_id;

  document.getElementById("formTitle").textContent = schema.title;
  const form = document.getElementById("dynamicForm");
  form.innerHTML = "";

  schema.fields.forEach(f => {
    const wrap = document.createElement("div");
    wrap.className = "row";

    const label = document.createElement("label");
    label.textContent = f.label + (f.required ? " *" : "");

    let input;
    if (f.type === "select") {
      input = document.createElement("select");
      (f.options || []).forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else if (f.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
    } else {
      input = document.createElement("input");
      input.type = f.type || "text";
    }

    input.name = f.name;
    if (f.required) input.required = true;

    wrap.appendChild(label);
    wrap.appendChild(input);
    form.appendChild(wrap);
  });

  document.getElementById("submitBtn").disabled = false;
}

async function submitForm() {
  const form = document.getElementById("dynamicForm");
  const data = {};
  [...form.elements].forEach(el => {
    if (el.name) data[el.name] = el.value;
  });

  const res = await fetch("http://127.0.0.1:8000/submit", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ form_id: currentFormId, data })
  });

  const out = await res.json();
  document.getElementById("output").textContent = JSON.stringify(out, null, 2);
}

document.getElementById("build").addEventListener("click", buildForm);
document.getElementById("submitBtn").addEventListener("click", submitForm);
