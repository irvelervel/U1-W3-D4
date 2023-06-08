// si parte!

// fase iniziale: cercare di capire quante celle sono da creare per il calendario
// ogni mese può avere un numero diverso di giorni, a seconda di quando apriamo la
// pagina ci aspetteremo di ottenere un calendario aggiornato per il mese in corso

// DOVE CI SALVIAMO GLI EVENTI?
// una cassettiera :) un array con tot posizioni quante sono le giornate del mese

// [ ['14:30 - Q&A', '17:00 - Debrief'], ['17:00 - Debrief'], ['14:30 - Q&A'], [], [] ]

const appointments = []

// [
//  [], [], [], [], [], [],
//  [], [], [], [], [], [],
//  [], [], [], [], [], [],
//  [], [], [], [], [], [],
//  [], []
// ]

const now = new Date() // creare un nuovo oggetto Date (data)

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

const unselectAllDays = function () {
  // approccio BULLDOZER
  //   let allTheCells = document.querySelectorAll('.day') // tutte le celle
  //   allTheCells.forEach((day) => {
  //     day.classList.remove('selected')
  //   })

  // approccio smart :)
  let previousSelected = document.querySelector('.selected') // precedente cella "selected"
  if (previousSelected) {
    // se il mio click non è il primo della pagina e c'è già un precedente selected...
    previousSelected.classList.remove('selected')
  }
}

const changeDayNumber = function (dayIndex) {
  // questa funzione si occuperà di cambiare il testo nello span con id "newMeetingDay"
  // con il valore della cella su cui abbiamo appena cliccato: il valore sarà dayIndex + 1
  // selezioniamo lo span
  let newMeetingDaySpan = document.getElementById('newMeetingDay')
  newMeetingDaySpan.innerText = dayIndex + 1

  // evidenzio lo span ora che ci ho assegnato un numero
  newMeetingDaySpan.classList.add('hasDay')
}

const showAppointments = function (indexOfAppointments) {
  // questa funzione si occuperà di:
  // - prelevare gli eventi dal cassetto indexOfAppointments
  const selectedDayAppointments = appointments[indexOfAppointments]
  const appointmentsList = document.getElementById('appointmentsList') // ul
  // ripulisco tutta la ul: potrei avere eventi generati da un click precedente
  appointmentsList.innerHTML = ''
  // - dovrà generare tanti <li> quante sono le stringhe contenute in appointments[indexOfAppointments]
  selectedDayAppointments.forEach((appointment) => {
    const newLi = document.createElement('li')
    newLi.innerText = appointment
    // - dovrà appendere questi <li> al dom, ovvero alla <ul> già esistente in HTML
    appointmentsList.appendChild(newLi)
  })
  // - dovrà togliere il display: none dal div relativo agli appuntamenti
  document.getElementById('appointments').style.display = 'block'
}

const createDays = function (days) {
  // days è il numero di celle da creare

  // prendiamo un riferimento al div vuoto con id = "calendar"
  const calendarDiv = document.getElementById('calendar')

  // ciclo for su days per generare un numero corrispondente di celle
  for (let i = 0; i < days; i++) {
    // per ogni giorno del mese...
    // creo un cassettino dentro la cassettiera
    // --> inserisco un array vuoto dentro appointments
    appointments.push([])
    // mi ritroverò un array appointments con tanti sotto-array quanti sono
    // i giorni del mese

    // creo una cella
    let dayCellDiv = document.createElement('div')
    // <div></div>
    dayCellDiv.classList.add('day')
    // <div class="day"></div>

    // devo fare ancora una cosa con il mio div della cella: renderlo cliccabile
    dayCellDiv.addEventListener('click', function (e) {
      // dobbiamo TOGLIERE i precedenti "selected" prima di aggiungerne uno nuovo!
      unselectAllDays()

      // funziona! però voglio poter rendere "selected" solo un giorno alla volta...
      dayCellDiv.classList.add('selected')

      // ora voglio portare il numero del giorno su cui ho cliccato
      // nello span con id = "newMeetingDay"

      changeDayNumber(i)

      // sempre al click di una giornata, nel caso ci siano eventi da mostrare
      // facciamo comparire la sezione "appointments"
      // appointments[i] // è l'array degli eventi della giornata su cui ho cliccato
      if (appointments[i].length > 0) {
        // significa che in questa giornata ci sono degli eventi salvati!
        // li devo mostrare...
        showAppointments(i)
      } else {
        // la giornata che ho cliccato non ha eventi!
        // ri-nascondiamo per sicurezza la sezione appointments of the day
        document.getElementById('appointments').style.display = 'none'
      }
    })

    // abbiamo creato la cella, ora creiamone il contenuto
    let cellValue = document.createElement('h3')
    // <h3></h3>
    cellValue.innerText = i + 1

    // dopo aver applicato il contenuto della cella, cerchiamo di capire
    // quale rappresenta la giornata di oggi

    const today = now.getDate() // oggi torna 8

    if (i + 1 === today) {
      cellValue.classList.add('color-epic') // colore viola
    }

    dayCellDiv.appendChild(cellValue) // inserisco il numero del giorno nella cella
    calendarDiv.appendChild(dayCellDiv) // inserisco la cella dentro la griglia del calendario
  }
  console.log('APPOINTMENTS', appointments)
  // i non esiste
}

const saveMeeting = function (e) {
  e.preventDefault() // grazie all'evento scaturito dal submit fermo il comportamento di default
  // ora posso fare quello che voglio :)
  // recupero il giorno selezionato
  const selectedDay = document.getElementById('newMeetingDay').innerText // "20"
  // recupero il valore del time
  const meetingTime = document.getElementById('newMeetingTime').value // value dell'input field
  const meetingName = document.getElementById('newMeetingName').value // value dell'input field
  const meetingString = meetingTime + ' - ' + meetingName // "14:30 - Q&A"
  // const meetingString = `${meetingTime} - ${meetingName}` // "14:30 - Q&A" con backtick

  // ora devo inserire la mia stringa dentro il "cassetto" giusto, il giorno corretto!
  // lo posso recuperare da selectedDay! Però attenzione: selectedDay è stato "adattato"
  // per essere una cella del calendario, il cassetto a cui corrisponde nella cassettiera
  // è selectedDay - 1
  const theRightIndex = parseInt(selectedDay) - 1
  appointments[theRightIndex].push(meetingString)
  console.log('APPOINTMENTS DOPO SALVATAGGIO', appointments)
  // svuoto gli input
  document.getElementById('newMeetingTime').value = ''
  document.getElementById('newMeetingName').value = ''
  showAppointments(theRightIndex)
}

const numberOfDays = daysInThisMonth() // 30 a giugno
// questo è il numero di volte per cui dovremo generare una cella
// stampiamo il mese corrente nel titolo
printCurrentMonthInH1()
// adesso dobbiamo creare le celle del calendario
createDays(numberOfDays)

// aggiungo al form un comportamento custom al submit
const formReference = document.querySelector('form')
formReference.addEventListener('submit', saveMeeting)
