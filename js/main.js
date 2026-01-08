document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const acceptBtn = banner.querySelector(".accept");
  const rejectBtn = banner.querySelector(".reject");
  const settingsBtn = banner.querySelector(".settings");
  const cookieText = banner.querySelector(".cookie-text");

  // Función para detectar si es móvil
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Mostrar banner si no hay consentimiento
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    // Ajuste de mensaje según dispositivo
    if (isMobile) {
      cookieText.innerHTML = "Usamos cookies para mejorar tu experiencia:";
    }
    banner.classList.add("show");
  }

  // Guardar consentimiento
  const saveConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    banner.classList.remove("show");
  };

  // Eventos de botones
  acceptBtn.addEventListener("click", () => saveConsent("accepted"));
  rejectBtn.addEventListener("click", () => saveConsent("rejected"));

  settingsBtn.addEventListener("click", () => {
    // Siempre ir a cookies.html desde index.html
    window.location.href = "/html/cookies.html";
  });
});
