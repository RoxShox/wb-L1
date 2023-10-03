const arrPersons = [
	{ name: "Jonh", age: 25 },
	{ name: "Jofree", age: 78 },
	{ name: "Mathew", age: 25 },
	{ name: "Flat", age: 25 },
	{ name: "Rat", age: 25 },
	{ name: "Flack", age: 61 },
	{ name: "Morbius", age: 21 },
]

function sortPerson(arr) {
	const sorted = arr.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if (a.age === b.age) {
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0
		} else {
			return a.age - b.age
		}
	})

	return sorted
}

console.log(sortPerson(arrPersons))
