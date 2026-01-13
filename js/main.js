/* ================================
   COOKIE UTILITIES
================================ */

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    expires +
    "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/";
}

/* ================================
   COOKIE BANNER (INDEX)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const message = document.querySelector("#cookie-banner .cookie-text");
  const actions = document.querySelector("#cookie-banner .cookie-actions");

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );

  if (banner) {
    const consent = getCookie("twe_cookie_consent");

    if (!consent) {
      banner.style.display = "block";
    }

    /* ===== Texto dinámico ===== */
    if (message) {
      if (isMobile) {
        message.textContent = "Usamos cookies para mejorar tu experiencia.";
      } else {
        message.textContent =
          "Usamos cookies para mejorar tu experiencia, puedes aceptar, rechazar o configurar.";
      }
    }

    /* ===== Ajustes SOLO PC ===== */
    if (!isMobile && actions) {
      actions.style.justifyContent = "center";
      actions.style.gap = "16px";
    }

    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "accepted", 180);
        setCookie("twe_cookie_analytics", "true", 180);
        setCookie("twe_cookie_marketing", "true", 180);
        banner.style.display = "none";
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "rejected", 180);
        setCookie("twe_cookie_analytics", "false", 180);
        setCookie("twe_cookie_marketing", "false", 180);
        banner.style.display = "none";
      });
    }
  }

  /* ================================
     COOKIES.HTML LOGIC
  ================================ */

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  if (analyticsCheckbox && marketingCheckbox) {
    analyticsCheckbox.checked =
      getCookie("twe_cookie_analytics") === "true";
    marketingCheckbox.checked =
      getCookie("twe_cookie_marketing") === "true";

    const acceptAllBtn = document.getElementById("cookie-accept-all");
    const rejectAllBtn = document.getElementById("cookie-reject-all");
    const saveBtn = document.getElementById("cookie-save");

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = true;
        marketingCheckbox.checked = true;

        setCookie("twe_cookie_consent", "accepted", 180);
        setCookie("twe_cookie_analytics", "true", 180);
        setCookie("twe_cookie_marketing", "true", 180);

        alert("Todas las cookies han sido aceptadas.");
      });
    }

    if (rejectAllBtn) {
      rejectAllBtn.addEventListener("click", () => {
        analyticsCheckbox.checked = false;
        marketingCheckbox.checked = false;

        setCookie("twe_cookie_consent", "rejected", 180);
        setCookie("twe_cookie_analytics", "false", 180);
        setCookie("twe_cookie_marketing", "false", 180);

        alert("Todas las cookies han sido rechazadas.");
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        setCookie("twe_cookie_consent", "custom", 180);
        setCookie(
          "twe_cookie_analytics",
          analyticsCheckbox.checked,
          180
        );
        setCookie(
          "twe_cookie_marketing",
          marketingCheckbox.checked,
          180
        );

        alert("Preferencias de cookies guardadas correctamente.");
      });
    }
  }
});
