// Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами.
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

import moment from "./momentjs.js"

//  Отображение даты в нужном формате
const dateFormat = (date, format) => {
	return moment(date).format(format)
}

const currentDateNextYear = (date) => {
	// Можно передавать параметры в виде объекта
	return moment(date).add({ years: 1 })
}
const currentDateLastYear = () => {
	// Можно передавать параметры в виде цепочки данных
	return moment(date).subtract(1, "years").subtract(1, "days")
}
// Окончание какой-либо скидки
const endPromotion = (date, end) => {
	return moment(date).endOf(end)
}
endPromotion()
