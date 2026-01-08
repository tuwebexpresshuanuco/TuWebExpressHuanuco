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
      cookieText.textContent = "Usamos cookies para mejorar tu experiencia:";
    }
    banner.style.display = "block";
  }

  // Cargar estado de checkboxes desde localStorage
  if (functionalCheckbox) {
    const savedFunctional = localStorage.getItem("cookiesFunctional");
    functionalCheckbox.checked = savedFunctional === "true";
  }

  if (analyticsCheckbox) {
    const savedAnalytics = localStorage.getItem("cookiesAnalytics");
    analyticsCheckbox.checked = savedAnalytics === "true";
  }

  // Función para guardar cookies
  const saveCookies = (mode = "custom") => {
    if (mode === "accept") {
      localStorage.setItem("cookieConsent", "accepted");
      if (functionalCheckbox) functionalCheckbox.checked = true;
      if (analyticsCheckbox) analyticsCheckbox.checked = true;
      localStorage.setItem("cookiesFunctional", "true");
      localStorage.setItem("cookiesAnalytics", "true");
    } else if (mode === "reject") {
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
    banner.style.display = "none";
  };

  // Botones
  if (acceptBtn) acceptBtn.addEventListener("click", () => saveCookies("accept"));
  if (rejectBtn) rejectBtn.addEventListener("click", () => saveCookies("reject"));
  if (settingsBtn) settingsBtn.addEventListener("click", () => {
    window.location.href = "/html/cookies.html";
  });
});
