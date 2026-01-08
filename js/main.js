// ===== MAIN.JS =====

// ELEMENTOS DEL BANNER
const cookieBanner = document.getElementById("cookie-banner");
const btnAccept = document.querySelector(".cookie-btn.accept");
const btnReject = document.querySelector(".cookie-btn.reject");
const btnSettings = document.querySelector(".cookie-btn.settings");

// FUNCIONES PRINCIPALES
function mostrarBanner() {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    cookieBanner.style.display = "flex";
  } else {
    cookieBanner.style.display = "none";
  }
}

// Guardar elección desde banner (en tiempo real)
function guardarConsentimiento(tipo) {
  if (tipo === "accept") {
    localStorage.setItem("cookieConsent", "all");
    localStorage.setItem("cookiesFunctional", true);
    localStorage.setItem("cookiesAnalytics", true);
  } else if (tipo === "reject") {
    localStorage.setItem("cookieConsent", "necessary");
    localStorage.setItem("cookiesFunctional", false);
    localStorage.setItem("cookiesAnalytics", false);
  }
  actualizarBanner();
}

// Actualizar banner según estado guardado
function actualizarBanner() {
  const consent = localStorage.getItem("cookieConsent");
  if (consent) {
    cookieBanner.style.display = "none";
  } else {
    cookieBanner.style.display = "flex";
  }
}

// Sincronizar checkboxes de cookies.html o del banner si los hay
function sincronizarCheckboxes() {
  const functional = localStorage.getItem("cookiesFunctional") === "true";
  const analytics = localStorage.getItem("cookiesAnalytics") === "true";

  const functionalCheckbox = document.getElementById("functional");
  const analyticsCheckbox = document.getElementById("analytics");

  if (functionalCheckbox) functionalCheckbox.checked = functional;
  if (analyticsCheckbox) analyticsCheckbox.checked = analytics;
}

// Guardar preferencias desde cookies.html en tiempo real
function guardarPreferencias() {
  const functional = document.getElementById("functional")?.checked ?? false;
  const analytics = document.getElementById("analytics")?.checked ?? false;

  localStorage.setItem("cookieConsent", "custom");
  localStorage.setItem("cookiesFunctional", functional);
  localStorage.setItem("cookiesAnalytics", analytics);

  sincronizarCheckboxes();
  alert("Configuración de cookies guardada correctamente.");
}

// Texto dinámico según dispositivo
function textoBannerSegunDispositivo() {
  const cookieText = document.getElementById("cookie-text");
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (cookieText) {
    if (isMobile) {
      cookieText.textContent = "Usamos cookies para mejorar tu experiencia.";
    } else {
      cookieText.textContent = "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar según tu preferencia.";
    }
  }
}

// ===== EVENTOS =====
document.addEventListener("DOMContentLoaded", () => {
  mostrarBanner();
  textoBannerSegunDispositivo();
  sincronizarCheckboxes();
});

if (btnAccept) btnAccept.addEventListener("click", () => guardarConsentimiento("accept"));
if (btnReject) btnReject.addEventListener("click", () => guardarConsentimiento("reject"));
if (btnSettings) btnSettings.addEventListener("click", () => window.location.href = "/html/cookies.html");
