document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const cookieConsent = document.cookie.replace(/(?:(?:^|.*;\s*)cookieConsent\s*=\s*([^;]*).*$)|^.*$/, "$1");

  // Mostrar banner solo si no hay cookie
  if (!cookieConsent) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

  // Botones
  document.getElementById("cookie-accept").onclick = () => {
    document.cookie = "cookieConsent=accepted; path=/; max-age=" + 60*60*24*365; // 1 año
    banner.style.display = "none";
  };
  document.getElementById("cookie-reject").onclick = () => {
    document.cookie = "cookieConsent=rejected; path=/; max-age=" + 60*60*24*365; // 1 año
    banner.style.display = "none";
  };
  document.getElementById("cookie-save").onclick = () => {
    const analytics = document.getElementById("cookie-analytics").checked;
    const marketing = document.getElementById("cookie-marketing").checked;
    document.cookie = "cookieConsent=custom; path=/; max-age=" + 60*60*24*365;
    document.cookie = `cookiesAnalytics=${analytics}; path=/; max-age=` + 60*60*24*365;
    document.cookie = `cookiesMarketing=${marketing}; path=/; max-age=` + 60*60*24*365;
    banner.style.display = "none";
  };
});
