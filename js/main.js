/* ======================================================
   Tu Web Express Huánuco
   Cookie Manager – main.js
   ====================================================== */

(function () {

  const COOKIE_KEY = "twe_cookie_accepted";
  const PREF_KEY   = "twe_cookie_preferences";

  const isIndexPage  = document.getElementById("cookie-banner") !== null;
  const isCookiesPage =
    document.getElementById("functional") !== null ||
    document.getElementById("analytics") !== null;

  /* ===============================
     DETECCIÓN DE DISPOSITIVO
     =============================== */
  function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }

  /* ===============================
     INDEX.HTML → BANNER
     =============================== */
  if (isIndexPage) {
    const banner = document.getElementById("cookie-banner");

    if (!banner) return;

    // Texto dinámico
    const textEl = banner.querySelector(".cookie-text");
    if (textEl) {
      textEl.textContent = isMobileDevice()
        ? "Usamos cookies para mejorar tu experiencia."
        : "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar según tu preferencia.";
    }

    // Si ya existe decisión → no mostrar
    if (localStorage.getItem(COOKIE_KEY)) {
      banner.style.display = "none";
      return;
    }

    banner.style.display = "block";

    const btnAccept = document.getElementById("cookie-accept");
    const btnReject = document.getElementById("cookie-reject");
    const btnSave   = document.getElementById("cookie-save");

    if (btnAccept) {
      btnAccept.addEventListener("click", () => {
        localStorage.setItem(COOKIE_KEY, "accepted");
        localStorage.setItem(PREF_KEY, JSON.stringify({
          functional: true,
          analytics: true
        }));
        banner.style.display = "none";
      });
    }

    if (btnReject) {
      btnReject.addEventListener("click", () => {
        localStorage.setItem(COOKIE_KEY, "rejected");
        localStorage.setItem(PREF_KEY, JSON.stringify({
          functional: false,
          analytics: false
        }));
        banner.style.display = "none";
      });
    }

    if (btnSave) {
      btnSave.addEventListener("click", () => {
        window.location.href = "/html/cookies.html";
      });
    }
  }

  /* ===============================
     COOKIES.HTML → CONFIGURACIÓN
     =============================== */
  if (isCookiesPage) {
    const functional = document.getElementById("functional");
    const analytics  = document.getElementById("analytics");

    // Cargar preferencias previas
    const storedPrefs = localStorage.getItem(PREF_KEY);
    if (storedPrefs) {
      try {
        const prefs = JSON.parse(storedPrefs);
        if (functional) functional.checked = !!prefs.functional;
        if (analytics)  analytics.checked  = !!prefs.analytics;
      } catch (e) {
        console.warn("Preferencias corruptas, reiniciando.");
      }
    }

    // Exponer función global usada por cookies.html
    window.guardarCookies = function () {
      const prefs = {
        functional: functional ? functional.checked : false,
        analytics: analytics ? analytics.checked : false
      };

      localStorage.setItem(COOKIE_KEY, "custom");
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));

      window.location.href = "/html/index.html";
    };
  }

})();
