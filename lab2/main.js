const slider = document.querySelector("#slider")
const slides = document.querySelector(".slides")
const left = document.querySelector(".left")
const right = document.querySelector(".right")
const count = document.querySelectorAll("img")
const pauseStop = document.querySelector(".startStop")

let i = 0;
let stop = true
var intervalRef = null
startInterval();

pauseStop.addEventListener("click",() => {
    if(stop) {
        pauseStop.textContent = "►"
        stop = false
        clearInterval(intervalRef)
    }
    else {
        pauseStop.textContent = "◼"
        stop = true
        startInterval()
    }
})

function startInterval(){
    intervalRef = setInterval(
            () => {
                slides.style.transition = "200ms ease-in-out transform"
                slides.style.transform = `translateX(${-600 * i}px)`
                i++
                if(i>count.length-1) i = 0;
            },
            3000
        )
}

left.addEventListener("click",() =>{
    if(i <= 0) {
        i=count.length+1
        slides.style.transition = "200ms ease-in-out transform"
        slides.style.transform = `translateX(${-600 * i}px)`
        i--
    }
    slides.style.transition = "200ms ease-in-out transform"
    i--
    slides.style.transform = `translateX(${-600 * i}px)`
})

right.addEventListener("click",() =>{
    if(i > count.length-2) {
        i= -2
        slides.style.transition = "200ms ease-in-out transform"
        slides.style.transform = `translateX(${-600 * i}px)`
        i++
    }
    slides.style.transition = "200ms ease-in-out transform"
    i++
    slides.style.transform = `translateX(${-600 * i}px)`
})