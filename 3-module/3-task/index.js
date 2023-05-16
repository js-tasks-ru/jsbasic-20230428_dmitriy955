function camelize(str) {
  let toArray = str.split("-");

  return toArray.map(
    (el, i) => i === 0 ? el : el[0].toUpperCase() + el.slice(1)
  ).join("");
}
