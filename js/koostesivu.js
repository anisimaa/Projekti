/* var totalScore = 0;


function updateTotalScore() {
    var totalScoreElement = document.getElementById('total-score');
    totalScoreElement.innerText = "Pisteesi yhteensä: " + totalScore;
}*/

// Haetaan tallennetut pisteet local storagesta
var totalScore = localStorage.getItem('pisteet');

// Tarkistetaan, onko pisteitä tallennettu
if (totalScore !== null) {
    // Muunnetaan tallennetut pisteet takaisin numeroksi tarvittaessa
    var pisteet = parseInt(totalScore);

    console.log("Tallennetut pisteet: " + pisteet);
} else {
    // Jos pisteitä ei ole tallennettu, näytetään viesti
    console.log("Ei tallennettuja pisteitä.");
}

document.getElementById("viesti").innerHTML = "Pisteitä: " + pisteet;