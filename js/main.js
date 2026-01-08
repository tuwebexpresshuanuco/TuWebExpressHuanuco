// main.js

document.addEventListener("DOMContentLoaded", () => {
  // ======== DETECCIÓN DE DISPOSITIVO ========
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  // ======== BANNER DE COOKIES ========
  const cookieBanner = document.createElement("div");
  cookieBanner.id = "cookie-banner";
  cookieBanner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000000;
    color: #FFFFFF;
    border-top: 2px solid #0000FF;
    padding: 16px;
    display: flex;
    flex-direction: ${isMobile ? "column" : "row"};
    justify-content: ${isMobile ? "center" : "space-between"};
    align-items: center;
    gap: 12px;
    font-family: 'Montserrat', sans-serif;
    z-index: 9999;
  `;

  const bannerText = document.createElement("span");
  bannerText.textContent = isMobile
    ? "Usamos cookies para mejorar tu experiencia."
    : "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar según tu preferencia.";

  const acceptBtn = document.createElement("button");
  acceptBtn.textContent = "Aceptar";
  acceptBtn.style.cssText = `
    background: #000000;
    color: #FFFFFF;
    border: 2px solid #0000FF;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
  `;

  const configBtn = document.createElement("a");
  configBtn.textContent = isMobile ? "Configurar" : "Configurar Cookies";
  configBtn.href = "/html/cookies.html";
  configBtn.style.cssText = `
    background: #000000;
    color: #FFFFFF;
    border: 2px solid #0000FF;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
  `;

  cookieBanner.appendChild(bannerText);
  cookieBanner.appendChild(acceptBtn);
  cookieBanner.appendChild(configBtn);

  // Solo mostrar el banner si no hay consentimiento previo
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) document.body.appendChild(cookieBanner);

  // ======== FUNCIONALIDAD DEL BOTÓN ACEPTAR ========
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    // Por defecto aceptar cookies funcionales y analíticas
    localStorage.setItem("cookiesFunctional", true);
    localStorage.setItem("cookiesAnalytics", true);
    if(cookieBanner.parentNode) cookieBanner.parentNode.removeChild(cookieBanner);
  });

  // ======== CARGAR ESTADO DE COOKIES (si ya configuradas) ========
  const cookiesFunctional = localStorage.getItem("cookiesFunctional") === "true";
  const cookiesAnalytics = localStorage.getItem("cookiesAnalytics") === "true";

  // Aquí puedes inicializar servicios de analytics si cookiesAnalytics es true
  if(cookiesAnalytics){
    // Ejemplo: console.log("Iniciando Analytics...");
  }

  if(cookiesFunctional){
    // Ejemplo: console.log("Funciones mejoradas habilitadas...");
  }
});
