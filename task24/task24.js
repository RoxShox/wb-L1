// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

const url =
	"http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true"

// Получаем элементы DOM
const tableWrap = document.querySelector(".table-wrap")
const paginationWrap = document.querySelector(".pagination-wrap")
// Объект с значениями сортировок
let sortStates = {
	none: "none",
	asc: "asc",
	desc: "desc",
}
// кол-во эл-тов в таблице
const dataPersonsShowCount = 50
// текущая сортировка
let sortState = sortStates.none
// Столбец по которому сортировуются эл-ты
let sortActiveButtonId
// Все данные
let dataPersons = []
// Данные которые видны на клиенте
let dataPersonsShow = []

// запрос данных
async function fetchData() {
	try {
		const res = await fetch(url)
		const data = await res.json()

		return data
	} catch (err) {
		console.log(err)
	}
}
fetchData().then((res) => {
	dataPersons = res
	dataPersonsShow = res.slice(0, dataPersonsShowCount)
	renderTable(dataPersonsShow)
})

// Создаём кнопки для пагинации
function createPaginationButtons() {
	//  получаем кол-во страниц
	const numberOfPages = Math.ceil(dataPersons.length / dataPersonsShowCount)
	// через цикл создаём нужное кол-во кнопок
	for (let i = 1; i <= numberOfPages; i++) {
		const button = document.createElement("button")
		button.classList.add("pagination-btn")
		button.textContent = i
		button.dataset.page = i
		paginationWrap.append(button)
	}
}
//  создаём кнопки для сортировки
function createSortTableButton(text) {
	const btn = document.createElement("button")
	btn.textContent = text
	btn.classList.add("table__sort-btn")
	btn.id = text
	return btn
}

//  Создание таблицы
function createTable(itemsPerson) {
	const table = document.createElement("table")
	table.classList.add("table")
	const thead = document.createElement("thead")

	// Создание thead в таблице
	const tableHeadRow = createRow(itemsPerson[0], "th")
	thead.append(tableHeadRow)
	table.append(thead)

	const newTBody = getNewTbody(itemsPerson)
	table.append(newTBody)

	tableWrap.append(table)
}
// Создание рядов таблицы
function createRow(itemsPerson, cell = "td") {
	const row = document.createElement("tr")

	for (let key in itemsPerson) {
		let cellElement = document.createElement(cell)
		//  создаём ряд с названием колонок
		if (cell === "th") {
			const sortBtn = createSortTableButton(key)
			cellElement.append(sortBtn)
		} else {
			// значение ячеек
			cellElement.textContent = itemsPerson[key]
		}
		row.append(cellElement)
	}
	return row
}
//Отрисовка новых значений в tbody
function getNewTbody(itemsPerson) {
	const newTBody = document.createElement("tbody")

	for (person of itemsPerson) {
		const bodyRow = createRow(person)
		newTBody.append(bodyRow)
	}

	return newTBody
}

function renderTable(itemsPerson) {
	// Отрисовывем пагинацию
	createPaginationButtons()
	// Отрисовываем таблицу
	createTable(itemsPerson)

	const paginationBtns = document.querySelectorAll(".pagination-btn")
	// Вешаем клик на кнопки пагинации
	paginationBtns.forEach((btn) =>
		btn.addEventListener("click", changePageHandler)
	)

	const sortBtns = document.querySelectorAll(".table__sort-btn")
	// Вешаем клик на кнопки сортировки
	sortBtns.forEach((btn) => btn.addEventListener("click", changeSortHandler))
}
// Смена страницы
function changePageHandler(e) {
	// находим нужную страницу
	const page = e.target.dataset.page
	// получаем массив который нужно показать пользователю
	dataPersonsShow = dataPersons.slice(
		(page - 1) * dataPersonsShowCount,
		page * dataPersonsShowCount
	)
	// меняем tbody
	replaceBody()
}
// Смена старого tbody на актуальное
function replaceBody() {
	const currentTBody = document.querySelector("tbody")
	const table = currentTBody.parentNode
	const newTBody = getNewTbody(dataPersonsShow)
	table.replaceChild(newTBody, currentTBody)
}
// Обработчик сортировки
function changeSortHandler(e) {
	// проверяем сортировали уже какой-то столбец или нет
	if (sortActiveButtonId === e.target.id) {
		// Получаем значения видов сортировки из объекта sortStates
		const sortValues = Object.values(sortStates)
		const currentSortIndex = sortValues.indexOf(sortState)
		// Используем остаток от деления для циклического перехода к следующему режиму
		sortState = sortValues[(currentSortIndex + 1) % sortValues.length]
	}
	// если сортировки ещё не было делаем первой сортировкой по возрастанию
	else {
		sortState = sortStates.asc
		// присваиваем переменной id столбца по которому сортируем
		sortActiveButtonId = e.target.id
	}

	// Вызываем сортировку
	sortData(sortState, sortActiveButtonId)
	//  Обновляем наш tbody
	replaceBody()
	getNewTbody(dataPersonsShow)
}
// сортировка полей
function sortData(sortState, personItemKey) {
	dataPersonsShow.sort((a, b) => {
		// Если прихдит asc делаем сортировку по возрастанию
		if (sortState === "asc") {
			// проверяем наше значение на тип, если number, тогда отнимаем a - b
			if (typeof a[personItemKey] === "number") {
				return a[personItemKey] - b[personItemKey]
			}
			//в остальных случаях сравниваем как строки по методу localeCompare
			else {
				return a[personItemKey].localeCompare(b[personItemKey])
			}
			// Такая же система, только уже по убыванию
		} else if (sortState === "desc") {
			if (typeof a[personItemKey] === "number") {
				return b[personItemKey] - a[personItemKey]
			} else {
				return b[personItemKey].localeCompare(a[personItemKey])
			}
		}
	})
}
