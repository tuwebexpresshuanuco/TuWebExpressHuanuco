/* ================================
   MAIN.JS – TÚ WEB EXPRESS HUÁNUCO
   Gestión de Cookies (2026)
================================ */

// Claves de almacenamiento
const COOKIE_KEY = "twe_cookie_preferences";
const COOKIE_ACCEPTED_KEY = "twe_cookie_accepted";

// Detección de dispositivo
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// Obtener preferencias guardadas
function getSavedPreferences() {
  const data = localStorage.getItem(COOKIE_KEY);
  return data ? JSON.parse(data) : null;
}

// Guardar preferencias
function savePreferences(prefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  localStorage.setItem(COOKIE_ACCEPTED_KEY, "true");
}

// Mostrar banner
function showCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const text = banner.querySelector(".cookie-text");

  if (isMobile()) {
    text.textContent = "Usamos cookies para mejorar tu experiencia.";
  }

  banner.style.display = "block";
}

// Ocultar banner
function hideCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
}

// Inicializar checkboxes según estado guardado
function initCheckboxes() {
  const prefs = getSavedPreferences();
  if (!prefs) return;

  const analytics = document.getElementById("cookie-analytics");
  const marketing = document.getElementById("cookie-marketing");

  if (analytics) analytics.checked = !!prefs.analytics;
  if (marketing) marketing.checked = !!prefs.marketing;
}

// Aceptar todas las cookies
function acceptAllCookies() {
  const prefs = {
    necessary: true,
    analytics: true,
    marketing: true
  };

  savePreferences(prefs);
  hideCookieBanner();
}

// Rechazar cookies (solo necesarias)
function rejectCookies() {
  const prefs = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  savePreferences(prefs);
  hideCookieBanner();
}

// Guardar configuración personalizada
function saveCustomPreferences() {
  const analytics = document.getElementById("cookie-analytics");
  const marketing = document.getElementById("cookie-marketing");

  const prefs = {
    necessary: true,
    analytics: analytics ? analytics.checked : false,
    marketing: marketing ? marketing.checked : false
  };

  savePreferences(prefs);
  hideCookieBanner();
}

// Verificar estado al cargar
document.addEventListener("DOMContentLoaded", () => {
  const accepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);

  if (!accepted) {
    showCookieBanner();
  } else {
    initCheckboxes();
  }

  // Botones
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const saveBtn = document.getElementById("cookie-save");

  if (acceptBtn) acceptBtn.addEventListener("click", acceptAllCookies);
  if (rejectBtn) rejectBtn.addEventListener("click", rejectCookies);
  if (saveBtn) saveBtn.addEventListener("click", saveCustomPreferences);
});
