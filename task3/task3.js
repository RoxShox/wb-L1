// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го простого числа
// вычисление всех простых чисел до числа N

class MathX {
	getNthNum(num) {
		// Это 2 начальных числа фибоначчи они постоянны
		let prevValue = 0
		let nextValue = 1

		for (let i = 0; i < num; i++) {
			// Получаем следующее число сложив prev и next
			nextValue += prevValue
			// Получаем предыдущее число вычитая от следующего, предыдущие число
			prevValue = nextValue - prevValue
		}
		return prevValue
	}
	getAllNumbers(num) {
		const arr = []
		for (let i = 0; i < num; i++) {
			// Записываем в массив все числа фиббоначи до числа N
			arr.push(this.getNthNum(i))
		}
		return arr
	}

	getSimpleNumber(num) {
		for (let i = 2; i < num; i++) {
			// Если у нашего числа остаток от деления будет равен 0 значит это не простое число и мы возвращаем false
			if (num % i === 0) {
				return false
			}
		}
		return true
	}
	getAllSimpleNumber(num) {
		const arr = []
		for (let i = 0; i < num; i++) {
			// С помощью функции узнаем простое ли число, в случае true мы записываем это число в массив
			if (this.getSimpleNumber(i)) {
				arr.push(i)
			}
		}
		return arr
	}
}

const mathX = new MathX()

console.log(mathX.getNthNum(12))
console.log(mathX.getAllNumbers(9))
console.log(mathX.getSimpleNumber(59))
console.log(mathX.getAllSimpleNumber(59))
