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

//  Добавление debounce к async функциям
function debounce(fn, ms) {
	// храним таймер
	let timer = null

	return (...args) => {
		// Очищаем прошлый таймер
		clearTimeout(timer)
		return new Promise((resolve) => {
			// Создаем новый таймер, по истечению которого вызовется передаваемая функция
			timer = setTimeout(() => resolve(fn(...args)), ms)
		})
	}
}

// делаем запрос на адреса
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
	// отсеиваем option которые не попадают под наш запрос
	;[...select.options]
		.filter((option) => option.value !== "null")
		.forEach((option) => option.remove())
	// если адресов нет, возвращаем пустой массив
	if (!addresses || addresses.length === 0) {
		return []
	}

	addresses.forEach((address) => {
		// Создаем option
		const option = document.createElement("option")
		// Присваивае option value и textContent значения
		option.value =
			option.textContent = `${address.GeoObject.name},${address.GeoObject.description}`
		// Созданные option помещаем в селект
		select.append(option)
	})
}
