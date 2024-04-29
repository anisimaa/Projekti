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

 //oikean ja väärän vastauksen tunnistus
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

//seuraavabutton jatkaa seuraavaan kysymykseen tai aloittaa pelin uudelleen
function handleSeuraavaButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}
//seuraavabutton clickevent
seuraavabutton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleSeuraavaButton();
        }else {
            startGame();
        }
    })   

//lopputulokset
function showScore(){
    resetState();
    questionElement.innerHTML = `Sait ${pisteet} pistettä!`;
    localStorage.pisteet = pisteet;
    seuraavabutton.innerHTML = "Pelaa uudelleen";
    img.src = '../img/kauha.png';
    seuraavabutton.style.display = "block";
}

//talletetaan saadut pisteet local storageen
if (localStorage.pisteet) {
	pisteet = localStorage.pisteet;
} else {
	pisteet = 0;
}

startGame();



