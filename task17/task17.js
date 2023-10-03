// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.

const URL =
	"https://geocode-maps.yandex.ru/1.x/?apikey=8efc89c8-2136-4564-924c-c9b0d0679708&geocode="

const input = document.querySelector("#input")
const select = document.querySelector("#select")
const debouncedFetch = debounce(fetchAdress, 500)

input.addEventListener("input", (e) => {
	debouncedFetch(e.target.value).then(renderEl)
})

select.onchange = (e) => {
	{
		input.value = e.target.value
	}
}

function debounce(fn, ms) {
	let timer = null

	return (...args) => {
		clearTimeout(timer)
		return new Promise((resolve) => {
			timer = setTimeout(() => resolve(fn(...args)), ms)
		})
	}
}

async function fetchAdress(inputValue) {
	if (!inputValue) {
		return []
	}

	try {
		const res = await fetch(`${URL}${inputValue}&format=json`)
		const data = await res.json()

		return data.response.GeoObjectCollection.featureMember
	} catch (err) {
		console.log(err)
		return []
	}
}

const renderEl = (addresses) => {
	;[...select.options]
		.filter((option) => option.value !== "null")
		.forEach((option) => option.remove())
	if (!addresses || addresses.length === 0) {
		return []
	}
	addresses.forEach((address) => {
		const option = document.createElement("option")
		option.value =
			option.textContent = `${address.GeoObject.name},${address.GeoObject.description}`
		select.append(option)
	})
}

function removeOptions(options, criteria) {
	const optionsToRemove = options.filter(criteria)
	optionsToRemove.forEach((option) => option.remove())
}

// // Базовый URL для запросов с Yandex API
// const BASE_URL =
// 	"https://geocode-maps.yandex.ru/1.x/?apikey=8efc89c8-2136-4564-924c-c9b0d0679708&geocode="

// // Функция для формирования полного URL с запросом
// function getURL(request) {
// 	return BASE_URL + request + "&format=json"
// }

// // Получение элементов из DOM
// const inputElement = document.getElementById("input")
// const selectElement = document.getElementById("select")

// // Создание функции fetchGeoData с devounce
// const debouncedFetch = debounceAsync(fetchGeoData, 300)

// // Обработчик события ввода текста в поле ввода
// inputElement.oninput = (event) => {
// 	const value = event.target.value
// 	// Запуск функции fetchGeoData с devounce после ввода
// 	// и обновление опций после получения ответа
// 	debouncedFetch(value).then(updateOptions)
// }

// // Обработчик события выбора элемента из выпадающего списка
// selectElement.onchange = (event) => {
// 	inputElement.value = event.target.value
// }

// // Асинхронная функция для запроса геоданных
// async function fetchGeoData(query) {
// 	// Возвращаем пустой массив при пустом запросе
// 	if (!query) {
// 		return []
// 	}

// 	try {
// 		const response = await fetch(getURL(query))
// 		const data = await response.json()
// 		return data.response.GeoObjectCollection.featureMember
// 	} catch (error) {
// 		console.log(error)
// 		return []
// 	}
// }

// // Функция для добавления debounce асинхронным функциям
// function debounceAsync(func, delay) {
// 	// Переменная для хранения таймера
// 	let timerID = null

// 	return async (...args) => {
// 		// Удаляем прошлый таймаут
// 		clearTimeout(timerID)
// 		return new Promise((resolve) => {
// 			// Создаем новый таймаут, по прошествии которого функция будет вызвана
// 			// с последними переданными ей аргументами
// 			timerID = setTimeout(async () => {
// 				const result = await func(...args)
// 				resolve(result)
// 			}, delay)
// 		})
// 	}
// }

// // Функция для обновления вариантов выбора в выпадающем списке
// function updateOptions(addresses) {
// 	// Удаление всех вариантов выбора, кроме "none"
// 	removeOptions(
// 		Array.from(selectElement.options),
// 		(option) => option.value !== "none"
// 	)

// 	if (!addresses || addresses.length === 0) {
// 		return
// 	}

// 	// Добавление новых вариантов выбора на основе полученных геоданных
// 	addresses.forEach((address) => {
// 		const option = document.createElement("option")
// 		option.value =
// 			option.textContent = `${address.GeoObject.name}, ${address.GeoObject.description}`
// 		selectElement.append(option)
// 	})
// }

// // Функция для удаления опций из выпадающего списка на основе критерия
// function removeOptions(options, criteria) {
// 	const optionsToRemove = options.filter(criteria)
// 	optionsToRemove.forEach((option) => option.remove())
// }
