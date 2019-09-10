let length
let max
let arr
let w
let medianIndex
let startIndex
let number
let done
let status
let start
let canvas

const input = document.getElementById('number-input-container')

document.getElementById('start-search-btn').addEventListener('click', (e) => {
	e.preventDefault()
	setup()
	let value = parseInt(input.value)
	input.addEventListener('change', (e) => {
		value = parseInt(e.target.value)
	})
	if (isNaN(value)) {
		return
	} else {
		number = value
		start = true
	}
})

document.getElementById('reset-search-btn').addEventListener('click', setup)

function init() {
	length = 40
	max = 2500
	arr = new Array(length)
	w = window.screen.width / 50
	medianIndex = length - 1
	startIndex = 0
	done = false
	status = false
	start = false
}

Array.prototype.highlightElement = function(index) {
	fill(0, 255, 0)
	rect((index + 1)*w, 0, w, (this[index] / 5))
}

function setup() {
	if (!canvas) {
		canvas = createCanvas(window.screen.width, window.screen.height - 200)
	}
	if (arr instanceof Array) {
		medianIndex = length - 1
		startIndex = 0
		done = false
		status = false
		start = false
	} else {
		init()
	}
	canvas.parent('root')
	frameRate(10)
	for (let i = 0; i < arr.length; i++) {
		arr[i] = (i + 1) * 20
	}

	// console.log(arr.sort())
	// arr = arr.map(x => M)
	// console.log(arr.map(x => 2))
}

function draw() {
	background(0)
	for (let i = 0; i < arr.length; i++) {
		fill(255)
		rect((i+1)*w, 0, w, (arr[i] / 5))
	}

	for (let i = 0; i < arr.length; i++) {
		fill(255)
		text(arr[i], (i+1) * w, (arr[i]/5) + 20)
	}


	if (!start) {
		if (done) {
			for (let i = startIndex; i <= medianIndex; i++) {
				arr.highlightElement(i)
			}
		}
		return
	} else {
		for (let i = startIndex; i <= medianIndex; i++) {
			arr.highlightElement(i)
		}
	}


	if (done == true) {
		start = false
		if (arr[medianIndex] == number) {
			alert(`[DONE]: ${number} Found!`)
		} else {
			alert(`[DONE]: ${number} Not Found!`)
		}
	}

	if (arr[medianIndex] == number) {
		done = true
		status = 'found'
		startIndex = medianIndex
	} else if (arr[medianIndex] < number) {
		startIndex = medianIndex
		medianIndex = length
	}

	let temp = Math.floor((startIndex + medianIndex) / 2)
	if (medianIndex - 1 == startIndex) {
		done = true
	}

	if (arr[temp] == number) {
		startIndex = temp
		medianIndex = temp
	} else if (arr[temp] < number){
		startIndex = temp
	} else {
		medianIndex = temp
	}

}