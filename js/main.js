document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const acceptBtn = banner.querySelector(".accept");
  const rejectBtn = banner.querySelector(".reject");
  const settingsBtn = banner.querySelector(".settings");

  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.classList.add("show");
  }

  const saveConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    banner.classList.remove("show");
  };

  acceptBtn?.addEventListener("click", () => saveConsent("accepted"));
  rejectBtn?.addEventListener("click", () => saveConsent("rejected"));

  settingsBtn?.addEventListener("click", () => {
    window.location.href = "html/cookies.html";
  });
});
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (isMobile) {
  banner.style.fontSize = "0.9rem";
  banner.style.padding = "12px 20px";
} else {
  banner.style.fontSize = "0.95rem";
  banner.style.padding = "15px 30px";
}
