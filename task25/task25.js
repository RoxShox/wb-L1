// Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

const body = document.querySelector("body")

const createReactangle = (tag, styleObj) => {
	const el = document.createElement(tag)
	// Получаем все свойства
	const props = Object.keys(styleObj)
	// Все значения свойств
	const values = Object.values(styleObj)

	for (let i = 0; i < props.length; i++) {
		// присваиваем нашему элементу свойство и его значение
		el.style[props[i]] = values[i]
	}

	body.append(el)
}

const stylesObj = {
	width: "500px",
	height: "500px",
	background: "red",
	border: "1px solid black",
}

createReactangle("div", stylesObj)
