function highlight(table) {
  for (let tr of table.children[1].rows) {
    if (tr.cells[3].hasAttribute("data-available")) {
      if (tr.cells[3].dataset.available === "true") {
        tr.classList.add("available");
      } else {
        tr.classList.add("unavailable");
      }
    } else {
      tr.hidden = true;
    }

    if (tr.cells[2].textContent === "m") {
      tr.classList.add("male");
    } else {
      tr.classList.add("female");
    }

    if (tr.cells[1].textContent < 18) {
      tr.style.textDecoration = "line-through";
    }
  }
}
