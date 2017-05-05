// Settings
let rotation = 0
let originX = 0
let originY = 0
let offsetX = 0
let offsetY = 0

// Helpers

const elem = id => {
	return document.getElementById(id)
}

const dist = (y2, y1, x2, x1) => {
	return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
}

const radians = degrees => {
	return degrees * Math.PI / 180
}

const degrees = radians => {
	return radians * 180 / Math.PI
}

const angle = (y2, y1, x2, x1) => {
	return Math.atan2(y2 - y1, x2 - x1)
}

const coords = elem('coords')
const xhair = elem('xhair')

window.addEventListener('mousemove', event => {
	coords.textContent = event.x + ', ' + event.y
	xhair.style.left = event.x + 'px'
	xhair.style.top = event.y + 'px'
})

// DOM
const box = elem('box')
let rect

// Math
const getCorner = name => {
	let x1
	let y1

	const rot = radians(rotation)

	const x2 = rect.left + originX
	const y2 = rect.top + originY

	if (name === 'top-left') {
		x1 = rect.left
		y1 = rect.top
	}

	if (name === 'top-right') {
		x1 = rect.right
		y1 = rect.top
	}

	if (name === 'bottom-right') {
		x1 = rect.right
		y1 = rect.bottom
	}

	if (name === 'bottom-left') {
		x1 = rect.left
		y1 = rect.bottom
	}

	const ang = angle(y2, y1, x2, x1) + rot
	const dst = dist(y2, y1, x2, x1)
	const x = offsetX + Math.round(x2 - (Math.cos(ang) * dst))
	const y = offsetY + Math.round(y2 - (Math.sin(ang) * dst))

	return `${x}px, ${y}px`
}

// Output
const corners = elem('corners')
const outputCorners = () => {
	corners.innerText = `top-left: ${getCorner('top-left')} \n
						 top-right: ${getCorner('top-right')} \n
						 bottom-right: ${getCorner('bottom-right')} \n
						 bottom-left: ${getCorner('bottom-left')}`
}

const origin = elem('origin')

const applyTransforms = () => {
	origin.style.left = offsetX + originX + 'px'
	origin.style.top = offsetY + originY + 'px'
	origin.style.transform = `rotate(${rotation}deg)`

	box.style.transformOrigin = `${originX}px ${originY}px`
	box.style.transform = `rotate(${rotation}deg)`
	box.style.left = `${offsetX}px`
	box.style.top = `${offsetY}px`
}

const update = () => {
	applyTransforms()
	outputCorners()
}

const rotationValue = elem('rotationValue')
const rotationRange = elem('rotationRange')
rotationRange.value = rotation
rotationValue.innerHTML = `Rotation: ${rotation} &deg;`
rotationRange.addEventListener('input', () => {
	rotation = parseInt(rotationRange.value, 10)
	rotationValue.innerHTML = `Rotation: ${rotation} &deg;`
	update()
})

const originXValue = elem('originXValue')
const originXRange = elem('originXRange')
originXRange.value = originX
originXValue.innerHTML = `originX: ${originX}px;`
originXRange.addEventListener('input', () => {
	originX = parseInt(originXRange.value, 10)
	originXValue.innerHTML = `originX: ${originX}px;`
	update()
})

const originYValue = elem('originYValue')
const originYRange = elem('originYRange')
originYRange.value = originY
originYValue.innerHTML = `originY: ${originY}px;`
originYRange.addEventListener('input', () => {
	originY = parseInt(originYRange.value, 10)
	originYValue.innerHTML = `originY: ${originY}px;`
	update()
})

const offsetXValue = elem('offsetXValue')
const offsetXRange = elem('offsetXRange')
offsetXRange.value = offsetX
offsetXValue.innerHTML = `offsetX: ${offsetX}px;`
offsetXRange.addEventListener('input', () => {
	offsetX = parseInt(offsetXRange.value, 10)
	offsetXValue.innerHTML = `offsetX: ${offsetX}px;`
	update()
})

const offsetYValue = elem('offsetYValue')
const offsetYRange = elem('offsetYRange')
offsetYRange.value = offsetY
offsetYValue.innerHTML = `offsetY: ${offsetY}px;`
offsetYRange.addEventListener('input', () => {
	offsetY = parseInt(offsetYRange.value, 10)
	offsetYValue.innerHTML = `offsetY: ${offsetY}px;`
	update()
})

rect = box.getBoundingClientRect()
update()

