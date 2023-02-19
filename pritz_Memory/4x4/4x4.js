const gitter = document.querySelector('.gitter');
const resetButton = document.querySelector('#reset');
const buchstaben = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let kartenArr = [];
let umgedrehteKarten = [];
let passendeKarten = [];

function mischen() {
  buchstaben.sort(() => Math.random() - 0.5);
  return buchstaben;
}


function createGrid() {
  const gemischteBuchstaben = mischen().concat(mischen());
  gemischteBuchstaben.forEach((symbol, index) => 
  {
    if (index >= 16) 
    {
      return;

    }
    const karte = document.createElement('div');
    karte.classList.add('gitter-item');
    karte.setAttribute('buchstabe', symbol); //Attribut wird hinzugefügt
    karte.innerHTML = '?';
    gitter.appendChild(karte);
    kartenArr.push(karte);
    karte.addEventListener('click', function() {
      if (umgedrehteKarten.length < 2 && !passendeKarten.includes(karte)) {
        karte.innerHTML = symbol;
        karte.classList.add('umgedreht');
        umgedrehteKarten.push(karte);

        if (umgedrehteKarten.length === 2) {
          //vergleichen der beiden Karten
          if (umgedrehteKarten[0].getAttribute('buchstabe') !== umgedrehteKarten[1].getAttribute('buchstabe')) {
            setTimeout(function() {
              umgedrehteKarten[0].innerHTML = '?';
              umgedrehteKarten[0].classList.remove('umgedreht');
              umgedrehteKarten[1].innerHTML = '?';
              umgedrehteKarten[1].classList.remove('umgedreht');
              umgedrehteKarten = [];
            }, 1000);
          } else {
            passendeKarten.push(umgedrehteKarten[0], umgedrehteKarten[1]);
            umgedrehteKarten = [];
            if (passendeKarten.length === kartenArr.length) {
              stopTimer();
            }
          }
        }
      }
    });
  });
}


// Reset Karten und Timer
function resetGrid() {
  kartenArr.forEach(karte => {
    karte.innerHTML = '?';
    karte.classList.remove('umgedreht');
  });
  umgedrehteKarten = [];
  passendeKarten = [];

  seconds = 0;
  minutes = 0;
  stopTimer();
  startTimer();

  gitter.innerHTML = ''; //Leeren des memorygitters
  createGrid();
}


resetButton.addEventListener('click', resetGrid);
createGrid();

//Timer-Start
let seconds = 0;
let minutes = 0;
let timer;

function startTimer() {
  timer = setInterval(incrementTimer, 1000);
}

function incrementTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  document.getElementById('timer').innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
}

function stopTimer() {
  clearInterval(timer);
}
startTimer();
//Timer-Ende
