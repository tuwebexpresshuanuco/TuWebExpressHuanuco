/* =====================================================
   COOKIE CONSENT MANAGER – TuWebExpress Huánuco
   ===================================================== */

(function () {
  const COOKIE_NAME = "twe_cookie_consent";
  const COOKIE_DAYS = 180;

  /* ---------- Helpers ---------- */
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      date.toUTCString() +
      "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
      const [key, val] = c.split("=");
      if (key === name) return decodeURIComponent(val);
    }
    return null;
  }

  /* ---------- Banner Logic ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    if (!banner) return;

    const consent = getCookie(COOKIE_NAME);

    if (!consent) {
      banner.style.display = "block";
    }

    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");
    const configBtn = document.getElementById("cookie-config");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        setCookie(COOKIE_NAME, "accepted", COOKIE_DAYS);
        banner.style.display = "none";
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", () => {
        setCookie(COOKIE_NAME, "rejected", COOKIE_DAYS);
        banner.style.display = "none";
      });
    }

    if (configBtn) {
      configBtn.addEventListener("click", () => {
        window.location.href = "/cookies";
      });
    }
  });
})();
