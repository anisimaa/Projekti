var pisteet;


var btn_Espresso = [128, 155, 93, 116];
var btn_Clean = [123, 234, 456, 567];

var btn = btn_Espresso;
var pisteet = 0;

function showMessage(msg) {
    var messageBox = document.getElementById('message');
    messageBox.innerText = msg;
  
    if (msg.includes("Oikein!")) { // Check if message includes "Oikein!"
        messageBox.classList.add('info-container');
        pisteet++; // Increment score if the correct button is pressed
        console.log("pisteet: " + pisteet);
    } else {
        messageBox.classList.remove('info-container');
    }
}
localStorage.pisteet = pisteet;

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

seuraavabutton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleSeuraavaButton();
    }else {
        startGame();
    }
})   

var seuraavabutton = document.getElementById('seuraava');
seuraavabutton.addEventListener('click', function() {
    showScore();
});

function nextPage () {
    location.href = "../html/pelisivu_MS.html";
 }

function showScore() {
  var pointScoreContainer = document.getElementById('pointcontainer');
  pointScoreContainer.innerText = "Sait " + pisteet + " pistettä!";
  pointScoreContainer.classList.add('pointcontainer');
  pisteet = 0;
  coffeeInfo.style.display = 'none';
}

seuraavabutton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleSeuraavaButton();
    }else {
        nextPage();
    }
})   

