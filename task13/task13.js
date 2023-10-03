// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра.
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

//  До конца не понял какая логика должна быть у методов главного класса Shape
class Shape {
	constructor() {}

	getPerimetr() {
		console.log("In a progress")
	}
	getSquare() {
		console.log("In a progress")
	}
}

class Triangle extends Shape {
	constructor(sideA, sideB, sideC) {
		super()
		this.sideA = sideA
		this.sideB = sideB
		this.sideC = sideC
	}

	getPerimetr() {
		return this.sideA + this.sideB + this.sideC
	}
	getSquare() {
		const halfMeter = this.getPerimetr() / 2
		return Math.sqrt(
			halfMeter *
				(halfMeter - this.sideA) *
				(halfMeter - this.sideB) *
				(halfMeter - this.sideC)
		)
	}
}
const tree = new Triangle(6, 4, 3)
console.log(tree.getSquare())

class Rectangle extends Shape {
	constructor(width, height) {
		super()
		this.width = width
		this.height = height
	}

	getPerimetr() {
		return (this.width + this.height) * 2
	}
	getSquare() {
		return this.width * this.height
	}
}

const road = new Rectangle(8, 3)
console.log(road.getSquare())

class Circle extends Shape {
	constructor(radius) {
		super()
		this.radius = radius
	}

	getPerimetr() {
		return 2 * Math.PI * this.radius
	}
	getSquare() {
		return Math.PI * this.radius ** 2
	}
}

const earth = new Circle(25235)
console.log(earth.getSquare())
