const clone = document.querySelector("#template-clone")

const createEl = (parentNode) => {
	const template = document.createElement("template")
	template.innerHTML = `<div> Я шаблонный элеменет </div>`

	// Присваиваем перемнной, содержимое элемента tamplate
	const cloneTemplate = template.content.cloneNode(true)

	parentNode.append(cloneTemplate)
}

createEl(clone)
