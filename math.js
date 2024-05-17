const questions = [
    {
        question: "What is the sum of 130+125+191?",
        answers: [
            { text: "446", correct: true},
            { text: "335", correct: false},
            { text: "456", correct: false},
            { text: "426", correct: false},
        ]
    },
    {
        question: "If we minus 712 from 1500, how much do we get?",
        answers: [
            { text: "788", correct: true},
            { text: "778", correct: false},
            { text: "768", correct: false},
            { text: "758", correct: false},
        ]
    },
    {
        question: "50 times of 8 is equal to:",
        answers: [
            { text: "400", correct: true},
            { text: "80", correct: false},
            { text: "800", correct: false},
            { text: "4000", correct: false},
        ]
    },
    {
        question: "110 divided by 10 is:",
        answers: [
            { text: "11", correct: true},
            { text: "10", correct: false},
            { text: "5", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "20+(90÷2) is equal to:",
        answers: [
            { text: "65", correct: true},
            { text: "50", correct: false},
            { text: "55", correct: false},
            { text: "60", correct: false},
        ]
    },
    {
        question: "The product of 82 and 5 is:",
        answers: [
            { text: "410", correct: true},
            { text: "400", correct: false},
            { text: "420", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
        answers: [
            { text: "12", correct: true},
            { text: "10", correct: false},
            { text: "11", correct: false},
            { text: "13", correct: false},
        ]
    },
    {
        question: "Solve 24÷8+2.",
        answers: [
            { text: "5", correct: true},
            { text: "6", correct: false},
            { text: "8", correct: false},
            { text: "12", correct: false},
        ]
    },
    {
        question: "Solve: 300-(150x2)",
        answers: [
            { text: "0", correct: true},
            { text: "150", correct: false},
            { text: "100", correct: false},
            { text: "50", correct: false},
        ]
    },
    {
        question: "The product of 121 x 0 x 200 x 25 is",
        answers: [
            { text: "0", correct: true},
            { text: "1500", correct: false},
            { text: "4000", correct: false},
            { text: "None of these", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let score = 0;
let randomIndex = [];

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz(){
    score = 0;
    for(let i=0; i< questions.length; i++){
        randomIndex.push(i);
    }
    randomIndex = shuffleArray(randomIndex);
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[randomIndex[randomIndex.length - 1]];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers = shuffleArray(currentQuestion.answers);
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){  //remote the initial 4 answers from inside button and hide next button
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect){  //adding background colors
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score: ${score}/${questions.length}`;
    const script = document.createElement("p");
    script.classList.add("txt");
    questionElement.appendChild(script);
    if (score == questions.length){
        script.innerHTML = "Excellent! You are an expert in Math!";
    }
    else{
        script.innerHTML = "Nice try! Need a little bit more efforts!";
    }
    nextButton.innerHTML = "To Quiz Selection";
    nextButton.style.display = "block";
}

function handleNextButton(){
    randomIndex.pop();
    if(randomIndex.length > 0){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(randomIndex.length > 0){
        handleNextButton();
    }
    else{
        window.location.href = "quiz_selection.html";
    }
})

startQuiz();