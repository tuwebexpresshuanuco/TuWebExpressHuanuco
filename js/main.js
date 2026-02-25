/* ================================
   COOKIE UTILITIES
================================ */

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    expires +
    "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/";
}

/* ================================
   COOKIE BANNER (INDEX)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const message = document.querySelector("#cookie-banner .cookie-text");
  const actions = document.querySelector("#cookie-banner .cookie-actions");

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );

  if (banner) {
    const consent = getCookie("twe_cookie_consent");

    if (!consent) {
      banner.style.display = "block";
    }

    /* ===== Texto dinámico ===== */
    if (message) {
      if (isMobile) {
        message.textContent = "Usamos cookies para mejorar tu experiencia.";
      } else {
        message.textContent =
          "Usamos cookies para mejorar tu experiencia, puedes aceptar, rechazar o configurar según sus preferencias de cookies en cualquier momento.";
      }
    }

    /* ===== Ajustes SOLO PC ===== */
    if (!isMobile && actions) {
      actions.style.justifyContent = "center";
      actions.style.gap = "16px";
    }

    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "accepted", 180);
        setCookie("twe_cookie_analytics", "true", 180);
        setCookie("twe_cookie_marketing", "true", 180);
        banner.style.display = "none";
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "rejected", 180);
        setCookie("twe_cookie_analytics", "false", 180);
        setCookie("twe_cookie_marketing", "false", 180);
        banner.style.display = "none";
      });
    }
  }

  /* ================================
     COOKIES.HTML LOGIC
  ================================ */

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  if (analyticsCheckbox && marketingCheckbox) {
    analyticsCheckbox.checked =
      getCookie("twe_cookie_analytics") === "true";
    marketingCheckbox.checked =
      getCookie("twe_cookie_marketing") === "true";

    const acceptAllBtn = document.getElementById("cookie-accept-all");
    const rejectAllBtn = document.getElementById("cookie-reject-all");
    const saveBtn = document.getElementById("cookie-save");

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = true;
        marketingCheckbox.checked = true;

        setCookie("twe_cookie_consent", "accepted", 180);
        setCookie("twe_cookie_analytics", "true", 180);
        setCookie("twe_cookie_marketing", "true", 180);

        alert("Todas las cookies han sido aceptadas.");
      });
    }

    if (rejectAllBtn) {
      rejectAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = false;
        marketingCheckbox.checked = false;

        setCookie("twe_cookie_consent", "rejected", 180);
        setCookie("twe_cookie_analytics", "false", 180);
        setCookie("twe_cookie_marketing", "false", 180);

        alert("Todas las cookies han sido rechazadas.");
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "custom", 180);
        setCookie(
          "twe_cookie_analytics",
          analyticsCheckbox.checked,
          180
        );
        setCookie(
          "twe_cookie_marketing",
          marketingCheckbox.checked,
          180
        );

        alert("Preferencias de cookies guardadas correctamente.");
      });
    }
  }
});
"use strict";

/* =========================================================
   👑 EZEE SUPREMO — END-TO-END ENCRYPTION SYSTEM
   ========================================================= */

const EZEE = (() => {

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  /* ===== Utilidades ===== */

  const b64 = bytes =>
    btoa(String.fromCharCode(...new Uint8Array(bytes)));

  const unb64 = str =>
    new Uint8Array(atob(str).split("").map(c => c.charCodeAt(0)));

  /* ===== Derivación de clave segura ===== */

  async function deriveKey(password, salt) {

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 210000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  /* ===== CIFRAR ===== */

  async function encrypt(plainText, password) {

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv   = crypto.getRandomValues(new Uint8Array(12));

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

  /* ===== DESCIFRAR ===== */

  async function decrypt(payload, password) {

    const data = JSON.parse(payload);

    const salt = unb64(data.s);
    const iv   = unb64(data.i);
    const buf  = unb64(data.d);

    const key = await deriveKey(password, salt);

    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      buf
    );

    return dec.decode(plain);
  }

  return { encrypt, decrypt };

})();


/* =========================================================
   🚀 ENVÍO SEGURO SUPREMO
   ========================================================= */

async function EZEE_enviar() {

const mensaje = document.getElementById("secure-message")?.value.trim();
const clave   = document.getElementById("secure-passphrase")?.value;

  if (!mensaje || !clave || clave.length < 8) {
    alert("⚠️ Escribe mensaje y clave (mínimo 8 caracteres)");
    return;
  }

  try {

    /* ===== Crear paquete cifrado ===== */

    const paquete = JSON.stringify({
      t: Date.now(),
      m: mensaje
    });

    const cifrado = await EZEE.encrypt(paquete, clave);

    /* ===== Enviar ===== */

    await fetch("/api/secure-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: cifrado })
    });

    /* ===== Autodestrucción local ===== */

   document.getElementById("secure-message").value = "";
document.getElementById("secure-passphrase").value = "";

    alert("✅ Mensaje enviado con cifrado SUPREMO");

  } catch (e) {
    console.error(e);
    alert("❌ Error de cifrado o envío");
  }
}


/* =========================================================
   🔓 LECTOR PRIVADO (solo quien tenga la clave)
   ========================================================= */

async function EZEE_leer(payload) {

  const clave = prompt("🔑 Introduce la clave compartida");

  if (!clave) return;

  try {

    const texto = await EZEE.decrypt(payload, clave);
    const datos = JSON.parse(texto);

    alert(
      "📩 Mensaje seguro\n\n" +
      datos.m +
      "\n\n🕒 " +
      new Date(datos.t).toLocaleString()
    );

  } catch {
    alert("❌ Clave incorrecta o mensaje alterado");
  }
}


/* =========================================================
   ⚡ ATAJOS PRO
   ========================================================= */

document.addEventListener("keydown", e => {

  if (e.ctrlKey && e.key === "Enter") {
    EZEE_enviar();
  }

});


/* =========================================================
   🛡️ PROTECCIONES BÁSICAS CLIENTE
   ========================================================= */

/* Evitar copiar accidentalmente texto sensible */

document.addEventListener("copy", e => {
  const activo = document.activeElement;
 if (activo?.id === "secure-message" || activo?.id === "secure-passphrase")
    e.preventDefault();
    alert("🔐 Copia deshabilitada en modo seguro");
  }
});


/* Borrar datos si se cambia de pestaña */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    const m = document.getElementById("mensaje");
    const c = document.getElementById("clave");
    if (m) m.value = "";
    if (c) c.value = "";
  }
});


/* =========================================================
   🧠 CONEXIÓN DEL FORMULARIO EZEE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("secure-contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {

      e.preventDefault(); // 💥 DETIENE LA REDIRECCIÓN

      await EZEE_enviar();

    });
  }

});
