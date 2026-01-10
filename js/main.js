document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     UTILIDADES DE COOKIES
  ========================= */

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  }

  /* =========================
     BANNER DE COOKIES (INDEX)
  ========================= */

  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  if (banner && !getCookie("cookie_consent")) {
    banner.style.display = "block";
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "accepted", 365);
      if (banner) banner.style.display = "none";
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "rejected", 365);
      if (banner) banner.style.display = "none";
    });
  }

  /* =========================
     PÁGINA cookies.html
  ========================= */

  const saveConfigBtn = document.getElementById("cookie-save");
  const acceptAllBtn = document.getElementById("cookie-accept-all");
  const rejectAllBtn = document.getElementById("cookie-reject-all");

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "accepted", 365);
      alert("Cookies aceptadas.");
    });
  }

  if (rejectAllBtn) {
    rejectAllBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "rejected", 365);
      alert("Cookies rechazadas.");
    });
  }

  if (saveConfigBtn) {
    saveConfigBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "custom", 365);
      alert("Preferencias guardadas.");
    });
  }

});
