/* var totalScore = 0;


function updateTotalScore() {
    var totalScoreElement = document.getElementById('total-score');
    totalScoreElement.innerText = "Pisteesi yhteensä: " + totalScore;
}*/

// Hae tallennetut pisteet local storagesta
var totalScore = localStorage.getItem('pisteet');

// Tarkista, onko pisteitä tallennettu
if (totalScore !== null) {
    // Muunna tallennetut pisteet takaisin numeroksi tarvittaessa
    var pisteet = parseInt(totalScore);

    console.log("Tallennetut pisteet: " + pisteet);
} else {
    // Jos pisteitä ei ole tallennettu, voit esimerkiksi näyttää oletusarvon
    console.log("Ei tallennettuja pisteitä.");
}

document.getElementById("viesti").innerHTML = "Pisteitä: " + pisteet;