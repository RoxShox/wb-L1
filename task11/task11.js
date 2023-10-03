// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. Внутренняя функция должна иметь доступ к  переменной,
// определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение.

function makeCounter() {
	let count = 0

	return function () {
		return count++
	}
}

// в каждой переменной (counter1,counter2,counter3) будет своё лексическое окружение для переменной count,
// т.е замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ

let counter1 = makeCounter()
console.log(counter1())
console.log(counter1())
console.log(counter1())
let counter2 = makeCounter()
console.log(counter2())
console.log(counter2())
console.log(counter2())
let counter3 = makeCounter()
console.log(counter3())
console.log(counter3())
console.log(counter3())
