// Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

const arrayFunc = [
	(funcOne = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("One")
			}, 0)
		})
	}),
	(funcTwo = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("Two")
			}, 10)
		})
	}),
	(funcThree = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("Three")
			}, 100)
		})
	}),
]

const callAllFunction = async (arr) => {
	let indexForFunc = 0
	for (let func of arr) {
		const res = await func()
		indexForFunc += 1
		console.log(res, indexForFunc)
	}
}

console.log(callAllFunction(arrayFunc))
