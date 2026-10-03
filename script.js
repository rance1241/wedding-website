
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

const weddingDate = new Date("2027-06-26T12:00:00+09:00");

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


// Version 2.4 video handling.
// The video remains an elegant placeholder until media/wedding-film.mp4 is uploaded.
const weddingFilm = document.getElementById("weddingFilm");
const filmFrame = document.getElementById("filmFrame");

if (weddingFilm && filmFrame) {
  weddingFilm.addEventListener("loadedmetadata", () => {
    filmFrame.classList.add("has-video");
  });

  weddingFilm.addEventListener("error", () => {
    filmFrame.classList.remove("has-video");
  });
}


// Version 3.1 — Cutscenes carousel
(() => {
  const carousel = document.getElementById("cutsceneCarousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".cutscene-slide"));
  const prevButton = document.getElementById("cutscenePrev");
  const nextButton = document.getElementById("cutsceneNext");
  const currentLabel = document.getElementById("cutsceneCurrent");
  const totalLabel = document.getElementById("cutsceneTotal");
  const progressBar = document.getElementById("cutsceneProgressBar");

  let currentIndex = 0;
  let touchStartX = null;

  totalLabel.textContent = String(slides.length);

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    currentLabel.textContent = String(currentIndex + 1);
    progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });

  carousel.setAttribute("tabindex", "0");

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        showSlide(currentIndex + 1);
      } else {
        showSlide(currentIndex - 1);
      }
    }

    touchStartX = null;
  }, { passive: true });

  showSlide(0);
})();


// Version 3.3 — B-Roll memories carousel
(() => {
  const carousel=document.getElementById("memoryCarousel"); if(!carousel) return;
  const slides=Array.from(carousel.querySelectorAll(".memory-slide"));
  const prev=document.getElementById("memoryPrev"), next=document.getElementById("memoryNext");
  const current=document.getElementById("memoryCurrent"), total=document.getElementById("memoryTotal"), progress=document.getElementById("memoryProgressBar");
  let idx=0, touchStartX=null; total.textContent=String(slides.length);
  function show(i){idx=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===idx));current.textContent=String(idx+1);progress.style.width=`${((idx+1)/slides.length)*100}%`;}
  prev.addEventListener("click",()=>show(idx-1)); next.addEventListener("click",()=>show(idx+1));
  carousel.setAttribute("tabindex","0");
  carousel.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.preventDefault();show(idx-1)}if(e.key==="ArrowRight"){e.preventDefault();show(idx+1)}});
  carousel.addEventListener("touchstart",e=>{touchStartX=e.changedTouches[0].clientX},{passive:true});
  carousel.addEventListener("touchend",e=>{if(touchStartX===null)return;const d=e.changedTouches[0].clientX-touchStartX;if(Math.abs(d)>50)show(d<0?idx+1:idx-1);touchStartX=null},{passive:true});
  show(0);
})();
