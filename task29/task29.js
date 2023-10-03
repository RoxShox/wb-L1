// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице и
// выполняет определенные действия с этими данными, например, отправляет их на сервер или отображает
// всплывающее окно с результатами.

// Получаем нашу форму
const form = document.querySelector(".form")

// Вешаем событие отправки формы
form.addEventListener("submit", handleFormSubmit)

// Функция обработки отправки формы
async function handleFormSubmit(e) {
	// Отменяем действие по умолчание т.е перезагрузку страницы при отправке формы
	e.preventDefault()
	// Форматируем входящие данные в нужный нам вид
	const data = serializeForm(form)
	// Делаем загрузку при отправке данных на сервер
	toggleLoader()
	// получаем ответ от сервера
	const res = await sendData(data)
	//  Убираем лоадер
	toggleLoader()
	// если запрос успешный
	if (res.ok) {
		// Сообщаем об этом пользователю
		onSuccess(e.target, data)
	} else {
		// Если ошибка, также сообщаем об этом пользователю
		onError(res.statusText)
	}
}

function serializeForm(formNode) {
	//  получаем все элементы формы типа HTMLFormControlsCollection
	const { elements } = formNode
	//  превращаем в массив
	const data = Array.from(elements)
		// С помощью метода фильтр убираем эл-ты без аттрибута name, такие как button
		.filter((el) => el.name !== "")
		.map((element) => {
			// получаем у каждого эл-та name и value
			const { name, value } = element
			//  возвращаем объект
			return { [name]: value }
		})
	// формируем все полученные данные с формы в один объект
	return Object.assign({}, ...data)
}
//  Отправка данных на сервер
async function sendData(data) {
	return await fetch("https://62d7c00c49c87ff2af3bebec.mockapi.io/formPerson", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(data),
	})
}
//  Функция имитирующая загрузку
function toggleLoader() {
	const loader = document.getElementById("loader")
	loader.classList.toggle("hidden")
}

// Функция отображения удачной отправки данных
function onSuccess(formNode, data) {
	formNode.classList.toggle("hidden")
	alert(`Ващи отправленные данные - ${JSON.stringify(data)}`)
}
// Функция отображения ошибки при отправке
function onError(error) {
	alert(error)
}
