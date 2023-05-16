function getMinMax(str) {
  let numbersOnly = str.split(',').join(' ').split(' ').filter(i => Number(i));

  return {
    min: Math.min(...numbersOnly),
    max: Math.max(...numbersOnly)
  };
}
