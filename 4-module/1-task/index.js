function makeFriendsList(friends) {
  let namesList = document.createElement("UL");

  for (let name of friends) {
    namesList.innerHTML += `<li>${name.firstName} ${name.lastName}</li>`;
  }

  return namesList;
}
