// Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON,
// содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

const arr = [
	{ id: 1, country: "Russia" },
	{ id: 2, country: "Germany" },
	{ id: 3, country: "Italia" },
	{ id: 4, country: "France" },
	{ id: 5, country: "Belgium" },
]

const json = JSON.stringify(arr)
// Создаём класс для создания связного списка
class List {
	constructor(obj) {
		this.obj = obj
		this.nextObj = null
	}
}

function formatterFromJson(jsonFile) {
	// Парсим json объект в обычный
	const arr = JSON.parse(jsonFile)
	if (!Array.isArray(arr) || arr.length < 0) {
		return
	}

	// Формируем начало списка
	const firstObjOfArr = new List(arr[0])
	// В переменную текущего объекта сохраняем список
	let currentObj = firstObjOfArr
	// Проходимся по каждому объекту в массиве
	for (let i = 1; i < arr.length; i++) {
		// Создаем новый объект с данными
		const newObj = new List(arr[i])
		// Для текущего объекта указываем ссылку на новый
		currentObj.nextObj = newObj
		//  Сохраняем только что созданный объект
		currentObj = newObj
	}
	return firstObjOfArr
}

console.log(formatterFromJson(json))
