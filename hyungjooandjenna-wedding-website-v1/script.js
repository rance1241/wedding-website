
const languageButtons = document.querySelectorAll(".lang-option");
const translatableElements = document.querySelectorAll("[data-en][data-ko]");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function setLanguage(lang) {
  document.documentElement.lang = lang;

  translatableElements.forEach((el) => {
    const translation = el.dataset[lang];
    if (translation) el.innerHTML = translation;
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-ko]").forEach((el) => {
    const placeholder = lang === "ko" ? el.dataset.placeholderKo : el.dataset.placeholderEn;
    if (placeholder) el.setAttribute("placeholder", placeholder);
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


// =========================
// VERSION 4.8 — MAIN WEBSITE RSVP
// =========================

// After following SETUP-RSVP-GOOGLE-SHEETS.md, paste the deployed
// Google Apps Script Web App URL between the quotes below.
const MAIN_RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwPtA2o1IkeGhTI-mfJ5OBLxwtiJF6WJy4dGrToVUNvaZRaZqlYMnH6s4mzkl-q5WA/exec";

(() => {
  const choiceButtons = Array.from(document.querySelectorAll(".rsvp-choice"));
  const form = document.getElementById("mainRsvpForm");
  const attendanceInput = document.getElementById("rsvpAttendance");
  const selectedLabel = document.getElementById("rsvpSelected");
  const attendingFields = document.getElementById("attendingFields");
  const plusOneNameField = document.getElementById("plusOneNameField");
  const status = document.getElementById("mainRsvpStatus");

  if (!form || !choiceButtons.length) return;

  function currentLanguage() {
    return document.documentElement.lang === "ko" ? "ko" : "en";
  }

  function attendanceLabel(value) {
    const labels = {
      "Korea Wedding": { en: "Korea Wedding", ko: "한국 결혼식" },
      "U.S. Reception Party": { en: "U.S. Reception Party", ko: "미국 리셉션 파티" },
      "Both": { en: "Both celebrations", ko: "두 행사 모두" },
      "Not Attending": { en: "Not attending", ko: "불참" }
    };
    return labels[value]?.[currentLanguage()] || value;
  }

  function updateSelectedLabel() {
    const value = attendanceInput.value;
    if (!value) return;
    const prefix = currentLanguage() === "ko" ? "선택" : "Selected";
    selectedLabel.textContent = `${prefix}: ${attendanceLabel(value)}`;
  }

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.rsvpChoice;

      choiceButtons.forEach((b) => b.classList.toggle("selected", b === button));
      attendanceInput.value = choice;
      form.hidden = false;

      const notAttending = choice === "Not Attending";
      attendingFields.hidden = notAttending;

      if (notAttending) {
        form.querySelectorAll('input[name="plusOne"]').forEach((radio) => {
          radio.checked = radio.value === "No";
        });
        plusOneNameField.hidden = true;
        form.elements.plusOneName.value = "";
        form.elements.dietary.value = "";
      }

      status.textContent = "";
      updateSelectedLabel();

      setTimeout(() => {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    });
  });

  form.querySelectorAll('input[name="plusOne"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      plusOneNameField.hidden = radio.value !== "Yes" || !radio.checked;
      if (radio.value === "No" && radio.checked) {
        form.elements.plusOneName.value = "";
      }
    });
  });

  document.querySelectorAll(".lang-option").forEach((button) => {
    button.addEventListener("click", () => {
      setTimeout(updateSelectedLabel, 0);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!attendanceInput.value) return;

    const fd = new FormData(form);
    const plusOne = fd.get("plusOne") || "No";
    const payload = {
      type: "main_website_rsvp",
      attendance: fd.get("attendance") || "",
      name: fd.get("name") || "",
      plusOne,
      plusOneName: plusOne === "Yes" ? (fd.get("plusOneName") || "") : "",
      partySize: plusOne === "Yes" ? 2 : 1,
      dietary: fd.get("dietary") || "",
      note: fd.get("note") || "",
      language: currentLanguage(),
      submittedAt: new Date().toISOString()
    };

    if (!MAIN_RSVP_ENDPOINT) {
      status.textContent = currentLanguage() === "ko"
        ? "RSVP 입력란은 준비되었습니다. Google Sheets 연결 후 실제 응답이 저장됩니다."
        : "The RSVP form is ready. Connect Google Sheets to begin saving responses.";
      return;
    }

    const submitButton = form.querySelector(".rsvp-submit");
    submitButton.disabled = true;
    status.textContent = currentLanguage() === "ko" ? "전송 중..." : "Sending...";

    try {
      await fetch(MAIN_RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      status.textContent = currentLanguage() === "ko"
        ? "감사합니다. 참석 여부가 전달되었습니다."
        : "Thank you! Your RSVP has been submitted.";

      const selectedAttendance = attendanceInput.value;
      form.reset();
      attendanceInput.value = selectedAttendance;
      plusOneNameField.hidden = true;
      updateSelectedLabel();
    } catch (error) {
      status.textContent = currentLanguage() === "ko"
        ? "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        : "Something went wrong. Please try again.";
    } finally {
      submitButton.disabled = false;
    }
  });
})();
