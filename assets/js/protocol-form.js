/**
 * Załącznik nr 1 – Protokół wydania i zwrotu Sprzętu
 * Zapis w localStorage, walidacja pól (spójna z formularzem kontaktowym), drukowanie.
 */
(function () {
  const form = document.querySelector("[data-protocol-form]");
  if (!form) return;

  const STORAGE_KEY = "beskider-protocol-form";
  const ERRORS = {
    required: "To pole jest wymagane.",
    invalidEmail: "Wprowadź poprawny adres e-mail.",
    invalidPhone: "Wprowadź poprawny numer telefonu (9–15 cyfr).",
    invalidLength: "Wprowadzona ilość znaków jest niepoprawna.",
  };

  const RULES = {
    "protocol-date-issue": { required: false },
    "protocol-time-issue": { required: false },
    "protocol-date-return": { required: false },
    "protocol-time-return": { required: false },
    "protocol-reservation-no": { required: false },
    "protocol-client-name": { required: true, min: 2, max: 100 },
    "protocol-doc-id": { required: true, min: 1, max: 50 },
    "protocol-phone": { required: true },
    "protocol-email": { required: true },
    "protocol-equipment": { required: false },
    "protocol-accessories-issue": { required: false },
    "protocol-state-issue": { required: false },
    "protocol-damage-visible-issue": { required: false },
    "protocol-notes-issue": { required: false },
    "protocol-state-return": { required: false },
    "protocol-damage-return": { required: false },
    "protocol-accessories-missing": { required: false },
    "protocol-fee-rent": { required: false },
    "protocol-fee-overtime": { required: false },
    "protocol-fee-repair": { required: false },
    "protocol-fee-missing": { required: false },
    "protocol-total": { required: false },
    "protocol-date-protocol": { required: false },
  };

  const getGroup = (fieldName) => form.querySelector(`.form-group[data-field="${fieldName}"]`);
  const getInput = (group) => group && group.querySelector("input, textarea");

  function setFieldState(group, valid, message) {
    if (!group) return;
    const input = getInput(group);
    const errorEl = group.querySelector(".form-group__error");
    group.classList.remove("form-group--valid", "form-group--error");
    if (valid) {
      group.classList.add("form-group--valid");
      if (input) input.setAttribute("aria-invalid", "false");
      if (errorEl) errorEl.textContent = "";
    } else {
      group.classList.add("form-group--error");
      if (input) input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = message || "";
    }
  }

  function validateEmail(value) {
    const t = (value || "").trim();
    if (!t) return { valid: false, message: ERRORS.required };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return { valid: false, message: ERRORS.invalidEmail };
    return { valid: true };
  }

  function validatePhone(value) {
    const t = (value || "").trim();
    if (!t) return { valid: false, message: ERRORS.required };
    const digits = t.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) return { valid: false, message: ERRORS.invalidPhone };
    return { valid: true };
  }

  function validateLength(value, min, max, required) {
    const t = (value || "").trim();
    if (required && !t) return { valid: false, message: ERRORS.required };
    if (!required && !t) return { valid: true };
    if (min > 0 && t.length < min) return { valid: false, message: ERRORS.invalidLength };
    if (max > 0 && t.length > max) return { valid: false, message: ERRORS.invalidLength };
    return { valid: true };
  }

  function validateField(fieldName, value) {
    const rules = RULES[fieldName];
    if (!rules) return { valid: true };
    if (fieldName === "protocol-email") return validateEmail(value);
    if (fieldName === "protocol-phone") return validatePhone(value);
    const min = rules.min ?? 0;
    const max = rules.max ?? 0;
    return validateLength(value, min, max, rules.required !== false);
  }

  function runValidation(fieldName) {
    const group = getGroup(fieldName);
    if (!group) return;
    const input = getInput(group);
    const value = input ? input.value : "";
    const result = validateField(fieldName, value);
    setFieldState(group, result.valid, result.message);
  }

  function collectFormData() {
    const data = {};
    form.querySelectorAll("input[name], textarea[name]").forEach((el) => {
      const name = el.getAttribute("name");
      if (!name) return;
      if (el.type === "radio" || el.type === "checkbox") {
        if (el.checked) data[name] = el.value;
      } else {
        data[name] = el.value;
      }
    });
    form.querySelectorAll("input[type=radio][name]").forEach((el) => {
      const name = el.name;
      if (!(name in data)) data[name] = "";
    });
    return data;
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collectFormData()));
    } catch (_) {}
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object") return;
      Object.keys(data).forEach((name) => {
        const value = data[name];
        if (value == null) return;
        const el = form.querySelector(`[name="${name}"]`);
        if (!el) return;
        if (el.type === "radio" || el.type === "checkbox") {
          el.checked = el.value === String(value);
        } else {
          el.value = String(value);
        }
      });
    } catch (_) {}
  }

  function clearStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  let saveTimeout = null;
  function scheduleSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveToStorage();
      saveTimeout = null;
    }, 300);
  }

  loadFromStorage();

  Object.keys(RULES).forEach((fieldName) => {
    const group = getGroup(fieldName);
    if (!group) return;
    const input = getInput(group);
    if (!input || !input.value.trim()) return;
    runValidation(fieldName);
  });

  form.querySelectorAll(".form-group[data-field] input, .form-group[data-field] textarea").forEach((input) => {
    const group = input.closest(".form-group");
    const fieldName = group && group.getAttribute("data-field");
    if (!fieldName) return;
    input.addEventListener("blur", () => runValidation(fieldName));
    input.addEventListener("input", () => {
      runValidation(fieldName);
      scheduleSave();
    });
  });

  form.addEventListener("change", scheduleSave);

  const printBtn = form.querySelector("[data-protocol-print]");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  const clearBtn = form.querySelector("[data-protocol-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("Czy na pewno chcesz wyczyścić zapisane dane protokołu?")) return;
      form.reset();
      clearStorage();
      form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("form-group--valid", "form-group--error"));
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
      form.querySelectorAll(".form-group__error").forEach((el) => { el.textContent = ""; });
      clearBtn.focus();
    });
  }
})();
