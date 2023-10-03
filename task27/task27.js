const button = document.querySelector("#btn")
button.addEventListener("click", start)

function start() {
	var box = document.getElementById("box")
	var t = setInterval(move, 1)
	// Переменная для смены направления квадрата
	let direction = 0
	// Расстояние которое будет проходить квадрат по одной стороне
	let length = 150
	// Расстояние которое прошел квадрат
	let i = 0
	//  Положение квадрата по оси x
	let x = 0
	//  Положение квадрата по оси y
	let y = 0

	const circleGen = (function* circle() {
		while (true) {
			switch (direction) {
				case 0:
					x++
					break
				case 1:
					y++
					break
				case 2:
					x--
					break
				case 3:
					y--
					break
			}
			// увеличиваем расстояние которое должен пройти квадрат
			i++
			// если оно соответствует нашей длине, обнуляем нашу переменную и меняем направление квадрата
			if (i === length) {
				i = 0
				direction++
				// если наш квадрат прошел полный круг, обнуляем нашему переменную тем самым, запуская наш квадрат по новой
				if (direction > 3) direction = 0
			}
			//
			yield { x, y }
		}
	})()

	function move() {
		// получаем значение x или y, вызываем метод next чтобы получать следующие значения и так как у нас в цикл while
		// передаётся значение true значит у нас бесконечный цилк и наш генератор не прекратит свою работу
		const point = circleGen.next().value
		// устанавливаем значание по оси X
		box.style.left = point.x + "px"
		// устанавливаем значание по оси Y
		box.style.top = point.y + "px"
	}
}
