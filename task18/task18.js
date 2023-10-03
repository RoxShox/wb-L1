// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

const maxSizeStorage = () => {
	let total
	if (localStorage && !localStorage.getItem("size")) {
		let i
		try {
			// Проверка до 10мб
			for (i = 250; i <= 10000; i += 250) {
				// Заполняем стор символами до переполнения, и сразу же вычисляем количество памяти
				localStorage.setItem("test", new Array(i * 1024 + 1).join("a"))
			}
		} catch (e) {
			localStorage.removeItem("test")
			// Записываем размер памяти в стор и отнимаем начальное значение,
			total = localStorage.setItem("size", i - 250)
		}
	}
	return total
}
