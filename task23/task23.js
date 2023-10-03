// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

const input = document.querySelector("#password")

input.addEventListener("blur", (e) => {
	// console.log(e.target.value)
	checkPassword(e.target.value)
})

function checkPassword(password) {
	// Получаем пароль из формы
	const s_letters = /[a-z]/g // Буквы в нижнем регистре
	const b_letters = /[A-Z]/g // Буквы в верхнем регистре
	const digits = /\d/g // Цифры
	const specials = /[\W_]/g // Спецсимволы
	let is_s = false // Есть ли в пароле буквы в нижнем регистре
	let is_b = false // Есть ли в пароле буквы в верхнем регистре
	let is_d = false // Есть ли в пароле цифры
	let is_sp = false // Есть ли в пароле спецсимволы
	for (let i = 0; i < password.length; i++) {
		console.log(password[i])
		/* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
		if (!is_s && s_letters.test(password[i])) is_s = true
		else if (!is_b && b_letters.test(password[i])) is_b = true
		else if (!is_d && digits.test(password[i])) is_d = true
		else if (!is_sp && specials.test(password[i])) is_sp = true
	}
	let rating = 0
	let text = ""
	// console.log(is_s)
	if (is_s) rating++ // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
	if (is_b) rating++ // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
	if (is_d) rating++ // Если в пароле есть цифры, то увеличиваем рейтинг сложности
	if (is_sp) rating++ // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
	/* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
	if (password.length < 6 && rating < 3) text = "Простой"
	else if (password.length < 6 && rating >= 3) text = "Средний"
	else if (password.length >= 8 && rating < 3) text = "Средний"
	else if (password.length >= 8 && rating >= 3) text = "Сложный"
	else if (password.length >= 6 && rating == 1) text = "Простой"
	else if (password.length >= 6 && rating > 1 && rating < 4) text = "Средний"
	else if (password.length >= 6 && rating == 4) text = "Сложный"

	alert(text) // Выводим итоговую сложность пароля
}
