function toggleText() {
  let buttonToggle = document.querySelector(".toggle-text-button");
  let textHide = document.querySelector("#text");
  buttonToggle.addEventListener("click", () => textHide.toggleAttribute("hidden"));
}
