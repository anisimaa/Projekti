function updateScore(peliId, pisteet) {
	localStorage.setItem("peli" + peliId, pisteet)
}
updateScore(1, 0)


//kysymykset ja vastaukset
const questions = [
    {
        question: "Tunnista juoma",
        answers: [
            {text: "Americano", correct: false},
            {text: "Cappuccino", correct: true},
            {text: "Cortado", correct: false},
            {text: "Mocha", correct: false},
        ],
        img: "../img/cappuccino.jpg"
    },
    {
        question: "Tunnista juoma",
        answers: [
            {text: "Espresso", correct: true}, 
            {text: "Mocha", correct: false}, 
            {text: "Macchiato", correct: false}, 
            {text: "Latte", correct: false}, 
        ],
        img: "../img/espresso.jpg"
    },
    {
        question: "Tunnista juoma",
        answers: [
            {text: "Flat white", correct: false}, 
            {text: "Americano", correct: false}, 
            {text: "Latte", correct: false}, 
            {text: "Matcha latte", correct: true}, 
        ],
        img: "../img/matchalatte.jpg"
    },
    {
        question: "Tunnista juoma",
        answers: [
            {text: "Macchiato", correct: false}, 
            {text: "Flat white", correct: false}, 
            {text: "Cortado", correct: false}, 
            {text: "Americano", correct: true}, 
        ],
        img: "../img/americano.jpg"
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('buttons')
const seuraavabutton = document.getElementById('seuraava')
const image = document.getElementById('img')

let currentQuestionIndex = 0;
let pisteet = 0;

//pelin aloitus nollasta
function startGame(){
    currentQuestionIndex = 0;
    pisteet = 0;
    seuraavabutton.innerHTML = "Seuraava";
    showQuestion();
}

function showQuestion (){
    resetState();
    //uusi kysymys vaihtuu joka kierros
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    //kuva vaihtuu joka kierros
    if(currentQuestion.img){
        image.src = currentQuestion.img;
        image.style.display = "block";
    }else {
        image.style.display = "none"
    }
    //vastausvaihtoehdot muuttuu joka kierroksella
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//resettaus joka kierroksen jälkeen
function resetState(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

 //oikean ja väärän vastauksen tunnistus + pisteiden laskua
function selectAnswer (e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        pisteet++;
    }else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    seuraavabutton.style.display = "block";
}

//näytetään seuraava kysymys tai  loppupisteet
function handleSeuraavaButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}
//seuraavabutton menee seuraavaan kysymykseen tai jatkaa seuraavaan peliin
seuraavabutton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleSeuraavaButton();
        }else {
            nextPage();
        }
    })   

//siirtyy lopuksi seuraavalle sivulle
function nextPage () {
       location.href = "../html/pelisivu_KS.html";
}

//lopputulokset
function showScore(){
    resetState();
    questionElement.innerHTML = `Sait ${pisteet} pistettä!`;
	updateScore(1, pisteet)
    seuraavabutton.innerHTML = "Seuraava peli";
    img.src = '../img/kuppit.jpg';
    seuraavabutton.style.display = "block";
}

startGame();



