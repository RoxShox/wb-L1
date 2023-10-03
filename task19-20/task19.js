// Задание №19
//   Реализовать виджет, отображающий список постов из любого паблика в VK
//   (подойдет любой паблик, где постов очень много).
//   Например, с помощью этой [функции API VK](https://dev.vk.com/ru/method/wall.get).
//   Виджет должен иметь фиксированные размеры и возможность прокрутки.
//   При прокрутке содержимого виджета до конца должны подгружаться новые посты.
//   Необходимо реализовать возможность кэширования уже загруженных данных:
//   если пользователь закрыл страницу, а потом снова открыл ее,
//   виджет должен отображать все загруженные ранее данные (новые данные
//   должны подгружаться из учетом уже загруженных ранее).

// При переполнении `localStorage`, данные, загруженные последними должны вытеснять данные загруженные первыми.

// Задание №20
//    Реализовать функцию подсчета объема памяти занимаемого данными
//    в LocalStorage для предыдущей задачи. При изменении данных в localStorage
//    в консоль должен выводиться объем занятой памяти / максимальный размер хранилища.

// ==================================================

const list = document.querySelector(".list")
let maxSpaceLocalStorage = 0
const MAX_CACHED_POSTS = 150
const token =
	"vk1.a.X45t6zWHR5rtgHf_fXJXRZDM-PCffvFtw1N9RMTyr5CcCyViBjAnXxCG3pCC2sVnPrHq2ZBnB0pf1fr5BYKjeaCs7J1vO78KiCErR7OOukmWmkRhRewJsDs6Mc3Zxzsm7aDcbah-FFrP_zKgsd1uvOeoIl8MTZOnNShkCy6p_jYf5rIorDHug3CBis6PkKOybbcECi1d1fY-K3F3_Jnokg"
// количество загружаемых постов
let count = 5
// номер поста с которого нужно загрузить переданное количество (count)
let offset = 0
let isLoading = false
let storageItems = []

function debounce(fn, ms) {
	let timer = null

	return (...args) => {
		clearTimeout(timer)
		return new Promise((resolve) => {
			timer = setTimeout(() => resolve(fn(...args)), ms)
		})
	}
}

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
			localStorage.setItem("size", i - 250)
		}
	}
	return localStorage.getItem("size")
}

const getSizeLocalStorage = () => {
	let total = 0
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i)
		const value = localStorage.getItem(key)

		total += 2 * (key.length + value.length)
	}
	console.log(
		"Занято -",
		total,
		" байт",
		"Максимальный объем памяти",
		maxSizeStorage()
	)
}

const fetchPosts = () => {
	isLoading = true
	VK.Api.call(
		"wall.get",
		{
			owner_id: -8722610, // id сообщества VK
			domain: "championsscup",
			count: count, // количество записей
			offset: offset,
			access_token: token,
			v: 5.131,
		},
		(data) => {
			const newPosts = data.response.items
			storageItems = storageItems.concat(newPosts)
			offset += count
			setItemsToLocalStorage(newPosts)
			newPosts.forEach((item) => addItem(item))
			isLoading = false
		}
	)
}

const createItem = (item) => {
	const li = document.createElement("li")
	li.classList.add("item")

	const description = document.createElement("p")
	description.classList.add("item__descr")
	description.textContent = item.text

	li.append(description)

	const img = document.createElement("img")
	img.classList.add("item__img")
	img.src =
		item.attachments[0]?.photo?.sizes[3]?.url ||
		"https://rus-traktor.ru/upload/iblock/fdc/fdc568907146673b285dbb6a1bd63c0c.jpg"

	li.append(img)

	return li
}

const addItem = (item) => {
	list.append(createItem(item))

	list.addEventListener(
		"scroll",
		debounce(() => {
			const isScrolledToBottom =
				list.scrollTop + list.clientHeight + 10 >= list.scrollHeight
			// Если сейчас не идет загрузка и если лента прокручена в самый низ, подгружаем новые посты
			if (!isLoading && isScrolledToBottom) {
				fetchPosts()
			}
		}, 200)
	)
}

const setItemsToLocalStorage = () => {
	if (storageItems.length > MAX_CACHED_POSTS) {
		const postsToRemove = storageItems.length - MAX_CACHED_POSTS
		storageItems.splice(0, postsToRemove)
	}

	// Обновление кэшированных данных
	localStorage.setItem("cachePosts", JSON.stringify(storageItems))
	localStorage.setItem("cacheOffset", offset)

	getSizeLocalStorage()
}

const checkCachePosts = () => {
	const cachePosts = localStorage.getItem("cachePosts")
	const cacheOffset = +localStorage.getItem("cacheOffset")
	if (cachePosts && cacheOffset !== offset) {
		// Устанавливаем текущий offset равным cachedOffset, благодаря чему
		// будут грузиться актуальные посты, а не те, что уже были загружены
		offset = cacheOffset
		storageItems = JSON.parse(cachePosts)
		storageItems.forEach((item) => addItem(item))
		return
	}
	fetchPosts()
}
checkCachePosts()
