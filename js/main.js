/* =========================
   UTILIDADES DE COOKIES
========================= */

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
}

/* =========================
   BANNER DE COOKIES
========================= */

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  // 🔑 REGLA CLAVE:
  // Si NO existe cookie → mostrar banner
  // Si EXISTE (aceptada, rechazada o configurada) → NO mostrar
  const consent = getCookie("cookie_consent");

  if (!consent) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

  /* ===== BOTONES ===== */

  const btnAccept = document.getElementById("cookie-accept");
  const btnReject = document.getElementById("cookie-reject");
  const btnConfig = document.getElementById("cookie-config");

  if (btnAccept) {
    btnAccept.addEventListener("click", function () {
      setCookie("cookie_consent", "accepted", 365);
      banner.style.display = "none";
    });
  }

  if (btnReject) {
    btnReject.addEventListener("click", function () {
      setCookie("cookie_consent", "rejected", 365);
      banner.style.display = "none";
    });
  }

  if (btnConfig) {
    btnConfig.addEventListener("click", function () {
      // Guarda estado "custom" SOLO para indicar que ya decidió
      setCookie("cookie_consent", "custom", 365);
      window.location.href = "/cookies";
    });
  }
});
