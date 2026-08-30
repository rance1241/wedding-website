
const languageButtons = document.querySelectorAll(".lang-option");
const translatableElements = document.querySelectorAll("[data-en][data-ko]");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function setLanguage(lang) {
  document.documentElement.lang = lang;

  translatableElements.forEach((el) => {
    const translation = el.dataset[lang];
    if (translation) el.textContent = translation;
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("weddingLanguage", lang);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const savedLanguage = localStorage.getItem("weddingLanguage");
if (savedLanguage === "ko" || savedLanguage === "en") {
  setLanguage(savedLanguage);
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const weddingDate = new Date("2027-06-26T00:00:00+09:00");

function updateCountdown() {
  const now = new Date();
  let distance = weddingDate - now;

  if (distance <= 0) {
    distance = 0;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
