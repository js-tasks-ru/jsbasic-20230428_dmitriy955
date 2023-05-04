function checkSpam(str) {
  let strLow = str.toLowerCase();
  let checkOne = "1xBet".toLowerCase();
  let checkTwo = "xxx".toLowerCase();

  return (strLow.includes(checkOne) || strLow.includes(checkTwo));
}
