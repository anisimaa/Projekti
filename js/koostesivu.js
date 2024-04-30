function totalScore() {
	var totalScore = 0
	for(i = 0; i < localStorage.length; i++) {
		totalScore += parseInt(localStorage.getItem(localStorage.key(i)))
	}
    return totalScore
}

// Haetaan tallennetut pisteet local storagesta
var pisteet = totalScore()

// Tarkistetaan, onko pisteitä tallennettu
if (pisteet !== null) {
    console.log("Tallennetut pisteet: " + pisteet);
} else {
    // Jos pisteitä ei ole tallennettu, näytetään viesti
    console.log("Ei tallennettuja pisteitä.");
}

document.getElementById("viesti").innerHTML = "Pisteitä: " + pisteet;

localStorage.clear()
