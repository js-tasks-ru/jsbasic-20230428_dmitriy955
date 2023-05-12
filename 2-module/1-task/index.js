function sumSalary(salaries) {
  let result = 0;

  for (let i in salaries) {
    if (Number.isInteger(salaries[i])) {
      result += salaries[i];
    }
  }

  return result;
}
