var btn_Espresso = [128, 155, 93, 116];
var btn_Clean = [123, 234, 456, 567];

var btn = btn_Espresso;
var score = 0; // Initialize score

function showMessage(msg) {
    var messageBox = document.getElementById('message');
    messageBox.innerText = msg;
  
    if (msg.includes("Oikein!")) { // Check if message includes "Oikein!"
        messageBox.classList.add('info-container');
        score++; // Increment score if the correct button is pressed
        console.log("Score: " + score);
    } else {
        messageBox.classList.remove('info-container');
    }
}

function ClickImage(event) {
    console.log(event.offsetX + ":" + event.offsetY);

    if (CheckButton(event.offsetX, event.offsetY, btn)) {
        showMessage("Oikein! Tästä napista valutat espresson, valumisessa pitäisi kestää n. 25 sekuntia.");
    } else {
        showMessage("Väärin!");
    }
}

function CheckButton(x, y, clickBox) {
    if (x > clickBox[0] &&
        x < clickBox[1] &&
        y > clickBox[2] &&
        y < clickBox[3]) {
        return true;
    }
    return false;
}

function showScore() {
  var messageBox = document.getElementById('message');
  messageBox.innerText = "Sait " + score + " pistettä!";
  messageBox.classList.add('info-container');
}

var seuraavabutton = document.getElementById('seuraava');
seuraavabutton.addEventListener('click', function() {
    showScore();
});