document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");

  if (!getCookie("cookieConsent")) {
    banner.style.display = "block";
  }

  document.getElementById("cookie-accept").addEventListener("click", () => {
    setCookie("cookieConsent", "accepted", 365);
    banner.style.display = "none";
  });

  document.getElementById("cookie-reject").addEventListener("click", () => {
    setCookie("cookieConsent", "rejected", 365);
    banner.style.display = "none";
  });
});

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}
