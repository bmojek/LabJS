const btnPrzelicz = document.querySelector('#przelicz')
const btnDodaj = document.querySelector('#dodajPole')
const wynikiPojemnik = document.querySelector('#wyniki')

btnPrzelicz.addEventListener('click', () => {
    const liczby = document.querySelectorAll('#liczby input[type="text"]')
    let sum = 0
    let min = Infinity
    let max = -Infinity

    liczby.forEach(liczba =>{
        const wartosc = parseFloat(liczba.value)
        if(!isNaN(wartosc)){
            sum += wartosc
            min = Math.min(min, wartosc)
            max = Math.max(max, wartosc)
        }
    })

    const average = sum / liczby.length;

    wynikiPojemnik.innerHTML = "Suma: "+ sum + "\nŚrednia: " + average + "\nMin: " + min + "\nMax: "+ max
})

btnDodaj.addEventListener('click',() =>{
    const pojemnikPole = document.getElementById('liczby')
    const nowePole = document.createElement('input')
    nowePole.type = 'text'
    pojemnikPole.appendChild(nowePole)
    nowePole.addEventListener('dblclick', () => {
        pojemnikPole.removeChild(nowePole)
    })
})
