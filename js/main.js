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

/* ================================
   SECURE CONTACT (EZEE)
================================ */

async function encryptMessageWithPassphrase(plainText, passphrase) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plainText)
  );

  const toB64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));

  return {
    algorithm: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    iterations: 120000,
    salt: toB64(salt),
    iv: toB64(iv),
    ciphertext: toB64(cipherBuffer)
  };
}

const secureForm = document.getElementById("secure-contact-form");
const secureStatus = document.getElementById("secure-contact-status");

if (secureForm && secureStatus) {
  secureForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("secure-name")?.value?.trim();
    const contact = document.getElementById("secure-email")?.value?.trim();
    const message = document.getElementById("secure-message")?.value?.trim();
    const passphrase = document.getElementById("secure-passphrase")?.value || "";

    if (!name || !contact || !message || passphrase.length < 8) {
      secureStatus.textContent = "Completa todos los campos y usa una clave de al menos 8 caracteres.";
      return;
    }

    try {
      const payload = {
        createdAt: new Date().toISOString(),
        name,
        contact,
        message
      };

      const encrypted = await encryptMessageWithPassphrase(
        JSON.stringify(payload),
        passphrase
      );

      const encryptedText = [
        "[EZEE ENCRYPTED MESSAGE]",
        `timestamp: ${payload.createdAt}`,
        `algorithm: ${encrypted.algorithm}`,
        `kdf: ${encrypted.kdf}`,
        `iterations: ${encrypted.iterations}`,
        `salt: ${encrypted.salt}`,
        `iv: ${encrypted.iv}`,
        `ciphertext: ${encrypted.ciphertext}`
      ].join("\n");

      const subject = encodeURIComponent("Consulta cifrada desde TuWebExpress Huánuco");
      const body = encodeURIComponent(encryptedText);
      const to = "tuwebexpress.hco@gmail.com";

      const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      secureStatus.textContent = "Mensaje cifrado generado. Se abrió tu app de correo para enviarlo a tuwebexpress.hco@gmail.com.";
      secureForm.reset();
    } catch (error) {
      secureStatus.textContent = "No se pudo cifrar el mensaje en este navegador.";
    }
  });
}

