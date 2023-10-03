// Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, если это число является странным, и false в противном случае. Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

function strangeNumber(num) {
	// Создаем массив всех делителей, циклом находим все правильные делители, методом редьюс получаем сумму всех делителей и дальше сравниваем
	const arrDivisors = []

	for (let i = 0; i < num; i++) {
		if (num % i === 0) {
			arrDivisors.push(i)
		}
	}
	const totalSumDivisors = arrDivisors.reduce((acc, cur) => acc + cur, 0)
	if (totalSumDivisors === num) {
		console.log("true")
	} else {
		console.log("false")
	}
}

strangeNumber(28)
