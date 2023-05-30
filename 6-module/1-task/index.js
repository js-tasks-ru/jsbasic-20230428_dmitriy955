/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }
  getTemplate() {
    return `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
      </tr>
    </thead>
    <tbody>
      ${this.rows.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
        </tr>
      `)
      .join("")}
    </tbody>`;
  }
  render() {
    const elem = document.createElement("table");
    elem.innerHTML = this.getTemplate();

    const deleteButtons = elem.querySelectorAll("button");
    deleteButtons.forEach(item => item.addEventListener("click", e => e.target.closest("tr").remove()));

    return elem;
  }

}
