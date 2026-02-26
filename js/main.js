"use strict";

/* =========================================================
   DETECCIÓN GLOBAL DE DISPOSITIVO (usable en todo el archivo)
========================================================= */

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  .test(navigator.userAgent);


/* =========================================================
   COOKIE UTILITIES
========================================================= */

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 86400000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
}


/* =========================================================
   COOKIE BANNER + COOKIES.HTML LOGIC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== BANNER ===== */

  const banner = document.getElementById("cookie-banner");
  const message = document.querySelector("#cookie-banner .cookie-text");
  const actions = document.querySelector("#cookie-banner .cookie-actions");

  if (banner) {
    const consent = getCookie("twe_cookie_consent");

    banner.style.display = consent ? "none" : "block";

    if (message) {
      message.innerText = isMobile
        ? "Usamos cookies para mejorar tu experiencia."
        : "Usamos cookies para mejorar tu experiencia, puedes aceptar, rechazar o configurar según sus preferencias.";
    }

    if (!isMobile && actions) {
      actions.style.justifyContent = "center";
      actions.style.gap = "16px";
    }

    document.getElementById("cookie-accept")?.addEventListener("click", () => {
      setCookie("twe_cookie_consent", "accepted", 365);
      setCookie("twe_cookie_analytics", "true", 365);
      setCookie("twe_cookie_marketing", "true", 365);
      banner.style.display = "none";
    });

    document.getElementById("cookie-reject")?.addEventListener("click", () => {
      setCookie("twe_cookie_consent", "rejected", 365);
      setCookie("twe_cookie_analytics", "false", 365);
      setCookie("twe_cookie_marketing", "false", 365);
      banner.style.display = "none";
    });
  }


  /* ===== COOKIES.HTML ===== */

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  if (analyticsCheckbox && marketingCheckbox) {

    analyticsCheckbox.checked = getCookie("twe_cookie_analytics") === "true";
    marketingCheckbox.checked = getCookie("twe_cookie_marketing") === "true";

    document.getElementById("cookie-accept-all")?.addEventListener("click", () => {
      analyticsCheckbox.checked = true;
      marketingCheckbox.checked = true;

      setCookie("twe_cookie_consent", "accepted", 365);
      setCookie("twe_cookie_analytics", "true", 365);
      setCookie("twe_cookie_marketing", "true", 365);

      alert("Todas las cookies aceptadas.");
    });

    document.getElementById("cookie-reject-all")?.addEventListener("click", () => {
      analyticsCheckbox.checked = false;
      marketingCheckbox.checked = false;

      setCookie("twe_cookie_consent", "rejected", 365);
      setCookie("twe_cookie_analytics", "false", 365);
      setCookie("twe_cookie_marketing", "false", 365);

      alert("Todas las cookies rechazadas.");
    });

    document.getElementById("cookie-save")?.addEventListener("click", () => {
      setCookie("twe_cookie_consent", "custom", 365);
      setCookie("twe_cookie_analytics", String(analyticsCheckbox.checked), 365);
      setCookie("twe_cookie_marketing", String(marketingCheckbox.checked), 365);

      alert("Preferencias guardadas.");
    });
  }

});


/* =========================================================
   🔐 EZEE — CIFRADO E2EE
========================================================= */

const EZEE = (() => {

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
  const unb64 = str => new Uint8Array(atob(str).split("").map(c => c.charCodeAt(0)));

  async function deriveKey(password, salt) {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    const iterations = isMobile ? 90000 : 180000;

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function encrypt(plainText, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);

    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(plainText)
    );

    return JSON.stringify({
      v: 1,
      s: b64(salt),
      i: b64(iv),
      d: b64(cipher)
    });
  }

  async function decrypt(payload, password) {
    const data = JSON.parse(payload);
    const key = await deriveKey(password, unb64(data.s));

    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: unb64(data.i) },
      key,
      unb64(data.d)
    );

    return dec.decode(plain);
  }

  return { encrypt, decrypt };

})();


/* =========================================================
   ENVÍO SEGURO
========================================================= */

async function EZEE_enviar() {

  const mElem = document.getElementById("secure-message");
  const cElem = document.getElementById("secure-passphrase");

  if (!mElem || !cElem) return;

  const mensaje = mElem.value.trim();
  const clave = cElem.value;

  if (!mensaje || !clave || clave.length < 8) {
    alert("Clave muy corta o mensaje vacío.");
    return;
  }

  try {
    const paquete = JSON.stringify({ t: Date.now(), m: mensaje });
    const cifrado = await EZEE.encrypt(paquete, clave);

    await fetch("/api/secure-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: cifrado })
    });

    mElem.value = "";
    cElem.value = "";

    alert("Mensaje enviado con cifrado.");
  } catch {
    alert("Error al enviar.");
  }
}


/* =========================================================
   LISTENERS DE SEGURIDAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("secure-contact-form");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    EZEE_enviar();
  });
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "Enter") EZEE_enviar();
});

document.addEventListener("copy", e => {
  if (["secure-message", "secure-passphrase"].includes(document.activeElement?.id)) {
    e.preventDefault();
    alert("Copia deshabilitada por seguridad.");
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    ["secure-message", "secure-passphrase"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  }
});
