document.addEventListener('keypress', onKeyPress)

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
    "1": null,
    "2": null,
    "3": null,
    "4": null
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
    const record = (event) =>{
        const sound = KeyToSound[event.key]
        Channels[channel] = sound
    }
    window.addEventListener("keydown",record)
}

function playRecorded(channel){

    if(Channels[channel] !== null){
        Channels[channel].play()
        Channels[channel].currentTime = 0
    }
}
    


document.querySelector("#channel1Record").addEventListener("click", () => {recordSound(1)})
document.querySelector("#channel1Play").addEventListener("click", () => {playRecorded(1)})
