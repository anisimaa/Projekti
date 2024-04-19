const questions = [
    {
        question: "Tunnista kahvi",
        answers: [
            {text: "Americano", correct: false},
            {text: "Cappucino", correct: true},
            {text: "Cortado", correct: false},
            {text: "Mocha", correct: false},
        ],
        img: "../img/cafe-7441426_1280.png"
    },
    {
        question: "Tunnista kahvi",
        answers: [
            {text: "Espresso", correct: true}, 
            {text: "Mocha", correct: false}, 
            {text: "Macchiato", correct: false}, 
            {text: "Latte", correct: false}, 
        ],
        img: "../img/papu.png"
    },
    {
        question: "Tunnista kahvi",
        answers: [
            {text: "Mocha", correct: false}, 
            {text: "Americano", correct: false}, 
            {text: "Latte", correct: false}, 
            {text: "Matchalatte", correct: true}, 
        ]
    },
    {
        question: "Tunnista kahvi",
        answers: [
            {text: "Macchiato", correct: false}, 
            {text: "Flat white", correct: false}, 
            {text: "Mocha", correct: false}, 
            {text: "Americano", correct: true}, 
        ]
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('buttons')
const seuraavabutton = document.getElementById('seuraava')
const image = document.getElementById('img')

let currentQuestionIndex = 0;
let score = 0;

function startGame(){
    currentQuestionIndex = 0;
    score = 0;
    seuraavabutton.innerHTML = "Seuraava";
    showQuestion();
}


function showQuestion (){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if(currentQuestion.img){
        image.src = currentQuestion.img;
        image.style.display = "block";
    }else {
        image.style.display = "none"
    }

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

function resetState(){
    seuraavabutton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
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

function handleSeuraavaButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

seuraavabutton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleSeuraavaButton();
        }else {
            startGame();
        }
    })   

function showScore(){
    resetState();
    questionElement.innerHTML = `Sait ${score} pistettä!`;
    seuraavabutton.innerHTML = "Pelaa uudelleen";
    seuraavabutton.style.display = "block";
}



startGame();

