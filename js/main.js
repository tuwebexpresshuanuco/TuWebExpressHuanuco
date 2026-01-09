document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const text = banner.querySelector(".cookie-text");
  const btnAccept = document.getElementById("cookie-accept");
  const btnReject = document.getElementById("cookie-reject");
  const btnSave = document.getElementById("cookie-save");

  const analytics = document.getElementById("cookie-analytics");
  const marketing = document.getElementById("cookie-marketing");

  const decision = localStorage.getItem("twe_cookie_decision");

  /* === TEXTO SEGÚN DISPOSITIVO === */
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  text.textContent = isMobile
    ? "Usamos cookies para mejorar tu experiencia."
    : "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar.";

  /* === SI YA HAY DECISIÓN, NO MOSTRAR === */
  if (decision) {
    banner.style.display = "none";
    return;
  }

  /* === BOTÓN ACEPTAR === */
  btnAccept.addEventListener("click", () => {
    localStorage.setItem("twe_cookie_decision", "accepted");
    localStorage.setItem("twe_cookie_analytics", "true");
    localStorage.setItem("twe_cookie_marketing", "true");
    banner.style.display = "none";
  });

  /* === BOTÓN RECHAZAR === */
  btnReject.addEventListener("click", () => {
    localStorage.setItem("twe_cookie_decision", "rejected");
    localStorage.setItem("twe_cookie_analytics", "false");
    localStorage.setItem("twe_cookie_marketing", "false");
    banner.style.display = "none";
  });

  /* === BOTÓN CONFIGURAR === */
  btnSave.addEventListener("click", () => {
    window.location.href = "/html/cookies.html";
  });
});
