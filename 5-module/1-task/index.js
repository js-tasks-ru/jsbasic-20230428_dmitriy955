function hideSelf() {
  let buttonHide = document.querySelector(".hide-self-button");
  buttonHide.addEventListener("click", () => buttonHide.setAttribute("hidden", ""));
}
