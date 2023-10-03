// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

// Счетчик вызовов
let count = 0

function callFuncWithoutArgs() {
	count++
	// Ловим ошибку
	try {
		// Рекурсивно вызываем функцию
		return callFuncWithoutArgs()
	} catch (e) {
		//  Присваиваем count переменной res чтобы count можно было использовать для обеих функций, так как он находится в глобальной области видимости
		let res = count
		// Обнуляем значения count
		count = 0
		console.log(res)
	}
}

callFuncWithoutArgs()

function callFuncWithArgs() {
	// Функция с переменными
	const age = count
	const num = count
	const length = count

	count++

	try {
		return callFuncWithArgs()
	} catch (e) {
		let res = count
		count = 0
		console.log(res)
	}
}

callFuncWithArgs()

// Во всех основных браузерах(Chrome,Yandex,Edge,Opera) около 10000 вызовов без переменных и 8000 с перемнными
