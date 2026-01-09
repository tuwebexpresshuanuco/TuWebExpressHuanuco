document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const cookieText = document.querySelector("#cookie-banner .cookie-text");
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) {
    cookieText.textContent = "Usamos cookies para mejorar tu experiencia.";
  } else {
    cookieText.textContent =
      "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar según tu preferencia.";
  }

  // Recuperar valores de cookies
  const functional = getCookie("cookiesFunctional") === "true";
  const analytics = getCookie("cookiesAnalytics") === "true";
  const consent = getCookie("cookieConsent");

  // Mostrar estado actual de checkboxes
  if (consent) {
    document.getElementById("cookie-analytics").checked = analytics;
    document.getElementById("cookie-marketing").checked = getCookie("cookiesMarketing") === "true";
  }

  // Mostrar el banner solo si no se ha dado consentimiento
  if (!consent) banner.style.display = "block";

  // Botones
  document.getElementById("cookie-accept").onclick = () => {
    setCookie("cookieConsent", "all", 365);
    setCookie("cookiesFunctional", true, 365);
    setCookie("cookiesAnalytics", true, 365);
    setCookie("cookiesMarketing", true, 365);
    banner.style.display = "none";
  };

  document.getElementById("cookie-reject").onclick = () => {
    setCookie("cookieConsent", "none", 365);
    setCookie("cookiesFunctional", false, 365);
    setCookie("cookiesAnalytics", false, 365);
    setCookie("cookiesMarketing", false, 365);
    banner.style.display = "none";
  };

  document.getElementById("cookie-save").onclick = () => {
    const analyticsChecked = document.getElementById("cookie-analytics").checked;
    const marketingChecked = document.getElementById("cookie-marketing").checked;

    setCookie("cookieConsent", "custom", 365);
    setCookie("cookiesFunctional", true, 365);
    setCookie("cookiesAnalytics", analyticsChecked, 365);
    setCookie("cookiesMarketing", marketingChecked, 365);

    alert("Configuración de cookies guardada correctamente.");
    banner.style.display = "none";
  };
});

// Funciones para manejar cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
       }
