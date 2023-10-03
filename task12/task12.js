// Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства,
// такие как: название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.

const book = {
	title: "Палата номер 6",
	author: "Антон Павлович Чехов",
	years: 1892,
	setTitle: function (value) {
		this.title = value
	},
	setAuthor: function (value) {
		this.author = value
	},
	setYears: function (value) {
		this.years = value
	},
	getTitle: function () {
		return this.title
	},
	getAuthor: function () {
		return this.author
	},
	getYears: function () {
		return this.years
	},
}
