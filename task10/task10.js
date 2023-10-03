// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
function convertToJSON(value) {
	if (
		typeof value === "function" ||
		typeof value === "symbol" ||
		typeof value === undefined
	)
		return "incorrect data was transmitted"
	if (typeof value === "object") {
		// если передан объект, объявляем пустой массив, чтобы сложить в него каждую пару ключ-значение
		const array = []

		// перебираем объект с помощью for in
		for (key in value) {
			// при каждой итерации добавляем в массив строку
			// ключ оборачиваем в "" и а для значения рекурсивно вызываем данную функцию
			// это позволит добраться до любой вложенности объектов
			array.push(`"${key}":${convertToJSON(value[key])}`)
		}

		// return array;
		return `{${array.join(",")}}`
	}

	// если передаваемое значени функция, символ или undefined, выходим
	// тк аналог JSON.stringify не поддерживает эти типы данных

	if (typeof value === "string") {
		// если значение строка, оборачиваем её в "",
		// убираем пробелы  в начале и конце и возвращаем
		return `"${value.trim()}"`
	}

	if (
		typeof value === "number" ||
		typeof value === "boolean" ||
		value === null
	) {
		// если значение число, булиновое значение или null
		// с помощью конструктора String, получаем строку и возвращаем её
		return String(value)
	}

	if (Array.isArray(value)) {
		// если передан массив, перебираем его и для каждого элемента рекурсивно вызываем
		// текущую функцию и возвращаем новую строку разделенных запятыми
		return `[${value.map((item) => convertToJSON(item)).join(",")}]`
	}
}
