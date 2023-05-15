function showSalary(users, age) {
  return users.filter(i => i.age <= age).map(i => `${i.name}, ${i.balance}`).join('\n');
}
