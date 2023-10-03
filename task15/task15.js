// Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для ожидания выполнения
// других асинхронных операций, и возвращает результат выполнения.

// Самый стандартный запрос чего-либо
const fetchUsers = async () => {
	//  Запрашиваем данные с помощью метода fetch
	const res = await fetch("https://jsonplaceholder.typicode.com/users")
	// ok - логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299
	if (res.ok) {
		// декодируем ответ в формате json
		const data = await res.json()
		return data
	}
	throw new Error("something went wrong")
}
fetchUsers()
	.then((data) => console.log(data))
	.catch((err) => console.log(err))
