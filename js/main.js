/* ================================
   COOKIE UTILITIES
================================ */

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    // Cálculo preciso de milisegundos para 365 días
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Forzamos path=/ para que la cookie sea global en todo tu dominio
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
    // Verificamos que la cookie empiece exactamente con el nombre buscado
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  // Al borrar, también debemos especificar el path=/ para asegurar la eliminación
  document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
}


/* ================================
   COOKIE BANNER (INDEX)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const message = document.querySelector("#cookie-banner .cookie-text");
  const actions = document.querySelector("#cookie-banner .cookie-actions");

  // Detección de móvil mejorada
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (banner) {
    const consent = getCookie("twe_cookie_consent");

    // Si NO hay consentimiento, mostramos el banner
    if (!consent) {
      banner.style.display = "block";
    } else {
      banner.style.display = "none";
    }

    /* ===== Texto dinámico corregido ===== */
    if (message) {
      if (isMobile) {
        message.innerText = "Usamos cookies para mejorar tu experiencia.";
      } else {
        message.innerText = "Usamos cookies para mejorar tu experiencia, puedes aceptar, rechazar o configurar según sus preferencias de cookies en cualquier momento.";
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
      acceptBtn.onclick = () => {
        setCookie("twe_cookie_consent", "accepted", 365);
        setCookie("twe_cookie_analytics", "true", 365);
        setCookie("twe_cookie_marketing", "true", 365);
        banner.style.display = "none";
      };
    }

    if (rejectBtn) {
      rejectBtn.onclick = () => {
        setCookie("twe_cookie_consent", "rejected", 365);
        setCookie("twe_cookie_analytics", "false", 365);
        setCookie("twe_cookie_marketing", "false", 365);
        banner.style.display = "none";
      };
    }
  }

  /* ================================
     COOKIES.HTML LOGIC
  ================================ */

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  // Solo ejecutamos esto si estamos en la página que tiene los checkboxes
  if (analyticsCheckbox && marketingCheckbox) {
    
    // Sincronizar estado inicial
    analyticsCheckbox.checked = getCookie("twe_cookie_analytics") === "true";
    marketingCheckbox.checked = getCookie("twe_cookie_marketing") === "true";

    const acceptAllBtn = document.getElementById("cookie-accept-all");
    const rejectAllBtn = document.getElementById("cookie-reject-all");
    const saveBtn = document.getElementById("cookie-save");

    if (acceptAllBtn) {
      acceptAllBtn.onclick = () => {
        analyticsCheckbox.checked = true;
        marketingCheckbox.checked = true;
        setCookie("twe_cookie_consent", "accepted", 365);
        setCookie("twe_cookie_analytics", "true", 365);
        setCookie("twe_cookie_marketing", "true", 365);
        alert("Todas las cookies han sido aceptadas.");
      };
    }

    if (rejectAllBtn) {
      rejectAllBtn.onclick = () => {
        analyticsCheckbox.checked = false;
        marketingCheckbox.checked = false;
        setCookie("twe_cookie_consent", "rejected", 365);
        setCookie("twe_cookie_analytics", "false", 365);
        setCookie("twe_cookie_marketing", "false", 365);
        alert("Todas las cookies han sido rechazadas.");
      };
    }

    if (saveBtn) {
      saveBtn.onclick = () => {
        setCookie("twe_cookie_consent", "custom", 365);
        setCookie("twe_cookie_analytics", String(analyticsCheckbox.checked), 365);
        setCookie("twe_cookie_marketing", String(marketingCheckbox.checked), 365);
        alert("Preferencias guardadas correctamente.");
      };
    }
  }
});
     


  /* =========================================================
     COOKIES.HTML LOGIC (VERSIÓN SUPREMA Y SIN ERRORES)
     ========================================================= */

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  if (analyticsCheckbox && marketingCheckbox) {
    // Leemos el estado actual
    analyticsCheckbox.checked = getCookie("twe_cookie_analytics") === "true";
    marketingCheckbox.checked = getCookie("twe_cookie_marketing") === "true";

    const acceptAllBtn = document.getElementById("cookie-accept-all");
    const rejectAllBtn = document.getElementById("cookie-reject-all");
    const saveBtn = document.getElementById("cookie-save");

    /* --- OPCIÓN A: Aceptar Todo --- */
    if (acceptAllBtn) {
      acceptAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = true;
        marketingCheckbox.checked = true;

        setCookie("twe_cookie_consent", "accepted", 365);
        setCookie("twe_cookie_analytics", "true", 365);
        setCookie("twe_cookie_marketing", "true", 365);

        alert("Todas las cookies han sido aceptadas por 1 año.");
      });
    }

    /* --- OPCIÓN B: Rechazar Todo (La más segura) --- */
    if (rejectAllBtn) {
      rejectAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = false;
        marketingCheckbox.checked = false;

        setCookie("twe_cookie_consent", "rejected", 365);
        setCookie("twe_cookie_analytics", "false", 365);
        setCookie("twe_cookie_marketing", "false", 365);
        
        // Opcional: Si quieres borrar cookies de terceros podrías añadirlas aquí:
        // deleteCookie("_ga"); 

        alert("Todas las cookies han sido rechazadas.");
      });
    }

    /* --- OPCIÓN C: Guardar Personalización --- */
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "custom", 365);
        
        // CRÍTICO: Convertimos el booleano del checkbox a String "true" o "false"
        // Esto evita que getCookie() falle al comparar tipos distintos.
        setCookie("twe_cookie_analytics", String(analyticsCheckbox.checked), 365);
        setCookie("twe_cookie_marketing", String(marketingCheckbox.checked), 365);

        alert("Preferencias de cookies guardadas correctamente.");
      });
    }
       }
   
"use strict";

const EZEE = (() => {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
  const unb64 = str => new Uint8Array(atob(str).split("").map(c => c.charCodeAt(0)));

  async function deriveKey(password, salt) {
    const keyMaterial = await crypto.subtle.importKey(
      "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 210000, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  return {
    async encrypt(plainText, password) {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plainText));
      return JSON.stringify({ v: 1, s: b64(salt), i: b64(iv), d: b64(cipher) });
    },
    async decrypt(payload, password) {
      try {
        const data = JSON.parse(payload);
        const key = await deriveKey(password, unb64(data.s));
        const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(data.i) }, key, unb64(data.d));
        return dec.decode(plain);
      } catch (e) { throw new Error("Fallo en descifrado"); }
    }
  };
})();

/* === ENVÍO Y CONTROL === */

async function EZEE_enviar() {
  const mElem = document.getElementById("secure-message");
  const cElem = document.getElementById("secure-passphrase");
  if (!mElem || !cElem) return;

  const mensaje = mElem.value.trim();
  const clave = cElem.value;

  if (!mensaje || !clave || clave.length < 8) {
    alert("⚠️ Clave demasiado corta o mensaje vacío.");
    return;
  }

  try {
    const paquete = JSON.stringify({ t: Date.now(), m: mensaje });
    const cifrado = await EZEE.encrypt(paquete, clave);

    const res = await fetch("/api/secure-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: cifrado })
    });

    if (!res.ok) throw new Error("Servidor no disponible");

    // Limpieza segura
    mElem.value = "";
    cElem.value = "";
    alert("✅ Mensaje enviado con cifrado SUPREMO");
  } catch (e) {
    alert("❌ Error: No se pudo enviar el mensaje.");
  }
}

async function EZEE_leer(payload) {
  if (!payload) return;
  const clave = prompt("🔑 Introduce la clave compartida");
  if (!clave) return;

  try {
    const texto = await EZEE.decrypt(payload, clave);
    const datos = JSON.parse(texto);
    alert(`📩 Mensaje seguro\n\n${datos.m}\n\n🕒 ${new Date(datos.t).toLocaleString()}`);
  } catch {
    alert("❌ Clave incorrecta o mensaje corrupto.");
  }
}

/* === LISTENERS BLINDADOS === */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("secure-contact-form");
  if (form) form.addEventListener("submit", e => { e.preventDefault(); EZEE_enviar(); });
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "Enter" && document.getElementById("secure-contact-form")) {
    EZEE_enviar();
  }
});

document.addEventListener("copy", e => {
  if (["secure-message", "secure-passphrase"].includes(document.activeElement?.id)) {
    e.preventDefault();
    alert("🔐 Copia deshabilitada por seguridad.");
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

