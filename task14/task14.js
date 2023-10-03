// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено.
// Когда говорится "промис разрешается с данными об изображении", это означает, что промис должен быть успешно выполнен (resolved)
// с данными об изображении после того, как изображение будет загружено.

const body = document.querySelector("body")

const loadImages = (imgUrl) => {
	return new Promise((resolve, reject) => {
		const images = document.createElement("img")
		// загружаем изображение и его данные
		images.onload = () => {
			resolve({
				width: images.width,
				height: images.height,
				url: imgUrl,
			})
		}
		// если произошла ошибка передаём её в reject
		images.onerror = (err) => {
			reject(err)
		}
		// записываем в аттрибут ссылку
		images.src = imgUrl
		images.style.maxWidth = "100%"
		// помещаем изображение на страницу
		body.append(images)
	})
}

loadImages("https://придоньецимлы.рф/wp-content/uploads/2023/07/krasa-1.jpg")
	.then((res) => console.log("img onload - ", res))
	.catch((err) => console.log("error-", err))
