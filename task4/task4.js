// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:

// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь

// 	Функцию надо упаковать в модуль.

function selectWord(num, arr) {
	// получаем последние 2 цифры от нашего число
	const lastTwoNum = +num.toString().split("").slice(-2).join("")
	const lastNum = +num.toString().split("").slice(-1).join("")

	// По условиям выбираем форму слова которая нам подходит
	if (lastNum === 1) {
		return arr[0]
	}
	if (lastNum >= 2 && lastNum <= 4) {
		return arr[1]
	}
	if (lastTwoNum >= 11 && lastTwoNum <= 19) {
		return arr[2]
	}

	return arr[2]
}

console.log(selectWord(241, ["сообщение", "сообщения", "сообщений"]))
