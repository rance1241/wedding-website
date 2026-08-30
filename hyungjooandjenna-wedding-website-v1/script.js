
const toggle = document.getElementById("languageToggle");

toggle.addEventListener("click", () => {
  const korean = toggle.textContent.trim() === "한국어";
  toggle.textContent = korean ? "EN" : "한국어";
  alert(
    korean
      ? "한국어 버전은 다음 단계에서 추가할 예정입니다."
      : "The English version is currently displayed."
  );
});
