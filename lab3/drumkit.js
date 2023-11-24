window.addEventListener('keypress', onKeyPress)
const SelectChannel = document.querySelectorAll(".inp")
const metronomBtn = document.querySelector("#metronom")
let record = null
let intervalId
let isPlay = true

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9'),
}

 const Channels ={
     "1": [],
     "2": [],
     "3": [],
     "4": []
 }
 const Delays ={
    "1": [],
    "2": [],
    "3": [],
    "4": []
}
const clicked ={
    "1": true,
    "2": true,
    "3": true,
    "4": true
}
function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}
function recordSound(channel){
    
    const button = document.querySelector(`#channel${channel}Record`)

    if(clicked[channel]){
        button.textContent = "Stop"
        clicked[channel] = false
        let lastKeyPressTime = 0
        record = (event) =>{
        const sound = KeyToSound[event.key]
        Channels[channel].push(sound)
        const currentTime = new Date().getTime()
        const timeDifference = currentTime - lastKeyPressTime
        Delays[channel].push(timeDifference)
        lastKeyPressTime = currentTime
        }
        lastKeyPressTime = 0
        window.addEventListener("keydown",record)
    }
    else{
        button.textContent = "Nagrane"
        clicked[channel] = true
        window.removeEventListener("keydown",record)
    }
}

function playRecorded(channel){
    
    Channels[channel].forEach((element, i) => {
        setTimeout(() => {
            console.log(element)
            element.currentTime = 0
            element.play()
        
        }, i* Delays[channel][i]);
    })
}

function playSelected(){
    SelectChannel.forEach((input,i) =>{
        if(input.checked == true) playRecorded(i+1);
    })
}

const playClick = () =>{document.getElementById("met").play()}

function playMetronom() {
    if(isPlay){
        const bpmInput = document.getElementById('bpm')
        const bpm = parseInt(bpmInput.value, 10)
        const intervalMs = 60000 / bpm
        intervalId = setInterval(playClick, intervalMs)
        metronomBtn.textContent = "x"
        isPlay = false
    }else{
        clearInterval(intervalId)
        isPlay = true
        metronomBtn.textContent = ">"
    }

}

document.querySelector("#play-all").addEventListener("click", () => {playRecorded(1),playRecorded(2),playRecorded(3),playRecorded(4)})
document.querySelector("#play-selected").addEventListener("click", () => {playSelected()})
metronomBtn.addEventListener("click", () => {playMetronom()})
document.getElementById('bpm').addEventListener("change",()=>{playMetronom()})

document.querySelector("#channel1Record").addEventListener("click", () => {recordSound(1)})
document.querySelector("#channel1Play").addEventListener("click", () => {playRecorded(1)})
document.querySelector("#channel2Record").addEventListener("click", () => {recordSound(2)})
document.querySelector("#channel2Play").addEventListener("click", () => {playRecorded(2)})
document.querySelector("#channel3Record").addEventListener("click", () => {recordSound(3)})
document.querySelector("#channel3Play").addEventListener("click", () => {playRecorded(3)})
document.querySelector("#channel4Record").addEventListener("click", () => {recordSound(4)})
document.querySelector("#channel4Play").addEventListener("click", () => {playRecorded(4)})


