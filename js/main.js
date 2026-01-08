document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const acceptBtn = banner.querySelector(".accept");
  const rejectBtn = banner.querySelector(".reject");
  const settingsBtn = banner.querySelector(".settings");
  const cookieText = banner.querySelector(".cookie-text");

  const functionalCheckbox = document.getElementById("functional");
  const analyticsCheckbox = document.getElementById("analytics");

  // Detectar dispositivo móvil
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Mostrar banner si no hay consentimiento
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    if (isMobile) {
      cookieText.innerHTML = "Usamos cookies para mejorar tu experiencia:";
    }
    banner.classList.add("show");
  }

  // Cargar estado de checkboxes al iniciar
  if (functionalCheckbox) {
    const functionalSaved = localStorage.getItem("cookiesFunctional");
    functionalCheckbox.checked = functionalSaved === "true";
  }

  if (analyticsCheckbox) {
    const analyticsSaved = localStorage.getItem("cookiesAnalytics");
    analyticsCheckbox.checked = analyticsSaved === "true";
  }

  // Función para guardar cookies
  const saveCookies = (acceptAll = false, rejectAll = false) => {
    if (acceptAll) {
      localStorage.setItem("cookieConsent", "accepted");
      if (functionalCheckbox) functionalCheckbox.checked = true;
      if (analyticsCheckbox) analyticsCheckbox.checked = true;
      localStorage.setItem("cookiesFunctional", "true");
      localStorage.setItem("cookiesAnalytics", "true");
    } else if (rejectAll) {
      localStorage.setItem("cookieConsent", "rejected");
      if (functionalCheckbox) functionalCheckbox.checked = false;
      if (analyticsCheckbox) analyticsCheckbox.checked = false;
      localStorage.setItem("cookiesFunctional", "false");
      localStorage.setItem("cookiesAnalytics", "false");
    } else {
      localStorage.setItem("cookieConsent", "custom");
      if (functionalCheckbox)
        localStorage.setItem("cookiesFunctional", functionalCheckbox.checked);
      if (analyticsCheckbox)
        localStorage.setItem("cookiesAnalytics", analyticsCheckbox.checked);
    }
    banner.classList.remove("show");
  };

  // Eventos de botones
  acceptBtn.addEventListener("click", () => saveCookies(true));
  rejectBtn.addEventListener("click", () => saveCookies(false));
  settingsBtn.addEventListener("click", () => {
    window.location.href = "/html/cookies.html";
  });
});
