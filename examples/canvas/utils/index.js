const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = document.body.clientWidth
const height = window.innerHeight * 0.8
const devicePixelRatio = window.devicePixelRatio

canvas.width = width * devicePixelRatio
canvas.height = height * devicePixelRatio

canvas.style.width = width + 'px'
canvas.style.height = height + 'px'

context.scale(devicePixelRatio, devicePixelRatio)