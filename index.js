// si parte!

// fase iniziale: cercare di capire quante celle sono da creare per il calendario
// ogni mese può avere un numero diverso di giorni, a seconda di quando apriamo la
// pagina ci aspetteremo di ottenere un calendario aggiornato per il mese in corso

const now = new Date() // creare un nuovo oggetto Date (data)
console.log(now)

const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

// cerchiamo di capire quante celle creare
const daysInThisMonth = function () {
  const getYear = now.getFullYear() // 2023
  // getFullYear() su una data ritorna l'anno in corso

  const getMonth = now.getMonth() // 5
  // getMonth() su una data ritorna l'indice numerico del mese in corso, partendo da 0

  // quello di cui ho bisogno è ottenere l'ULTIMO giorno valido del mese corrente
  // perchè tale numero corrisponde anche al numero di giorni totali del mese!

  // per ottenere l'ultimo momento valido del mese in corso, mi genero una data in cui
  // fornisco l'anno corrente, il mese SUCCESSIVO e -tolgo- un giorno
  const lastDayDate = new Date(getYear, getMonth + 1, 0)
  //   console.log(lastDayDate)

  const lastNumericDayOfTheMonth = lastDayDate.getDate() // per giugno, è 30
  console.log(lastNumericDayOfTheMonth)
  return lastNumericDayOfTheMonth
}

const printCurrentMonthInH1 = function () {
  const title = document.querySelector('h1') // seleziono l'h1
  const monthIndex = now.getMonth() // indice del mese corrente a partire da 0, oggi dà 5
  const currentMonth = monthNames[monthIndex] // oggi dà Giugno
  console.log(currentMonth)
  title.innerText = currentMonth // metto Giugno nell'h1
}

daysInThisMonth() // 30 a giugno
// questo è il numero di volte per cui dovremo generare una cella

printCurrentMonthInH1()
