// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
function validateJSON(value) {
	// если передаваемое значени функция, символ или undefined, выходим, так как JSON не поддерживает эти данные
	if (
		typeof value === "function" ||
		typeof value === "symbol" ||
		typeof value === undefined
	)
		return "переданы некорректные данные"
	if (typeof value === "object") {
		// создаем чтобы сложить в него каждую пару ключ-значение
		const arr = []

		// перебираем объект с помощью for in
		for (key in value) {
			// проходимся по объекту и записываем ключ: значения в наш массив
			// для значения вызываем нашу функцию чтобы добраться до любой вложенности
			arr.push(`"${key}":${validateJSON(value[key])}`)
		}

		// return array;
		return `{${arr.join(",")}}`
	}

	if (typeof value === "string") {
		return `"${value.trim()}"`
	}

	if (
		typeof value === "number" ||
		typeof value === "boolean" ||
		value === null
	) {
		// с помощью конструктора String, получаем строку и возвращаем её
		return String(value)
	}

	if (Array.isArray(value)) {
		// Проходим по массиву, и для каждого эелемента вызываем нашу функцию
		return `[${value.map((item) => validateJSON(item)).join(",")}]`
	}
}
