// Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом. Палиндром — это строка,
// которая читается одинаково в обоих направлениях (например, «аргентина манит негра »).

function palindrom(str) {
	// Разворачиваем строку приводим к нижнему регистру, убираем лишние знаки и сравниваем строки.
	const reverseStr = str
		.split("")
		.reverse()
		.join("")
		.replace(/[^a-zа-яё]/gi, "")
		.toLowerCase()

	const originalStr = str.replace(/[^a-zа-яё]/gi, "").toLowerCase()

	if (reverseStr === originalStr) {
		console.log("Это строка палиндром")
	} else {
		console.log("К сожалению это не палиндром")
	}
}

palindrom("лидер., бредил")
