const questions = [
    {
        question: "What is a Free State?",
        answers: [
            { text: "Where civilans live", correct: false},
            { text: "State allowed slavery", correct: false},
            { text: "State did not allow slavery", correct: true},
            { text: "States rights", correct: false},
        ]
    },
    {
        question: "What is a Slave State?",
        answers: [
            { text: "Slave Codes", correct: false},
            { text: "Speach given by Abraham Lincoln", correct: false},
            { text: "State had slavery but didn't leave Union", correct: false},
            { text: "State allowed slavery", correct: true},
        ]
    },
    {
        question: "What is the Confedercy?",
        answers: [
            { text: "The southern states that left the Union", correct: true},
            { text: "Something to do with food", correct: false},
            { text: "To kill a leader", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "What is a border state?",
        answers: [
            { text: "A book", correct: false},
            { text: "State had slavery, but didn't leave union", correct: true},
            { text: "The southern states that left the Union", correct: false},
            { text: "Slave Codes", correct: false},
        ]
    },
    {
        question: "What is a Homefront?",
        answers: [
            { text: "Uncle Tom's Cabin", correct: false},
            { text: "Where civilans live", correct: true},
            { text: "A slave home", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "What is the executive branch known as?",
        answers: [
            { text: "Congress", correct: false},
            { text: "Supreme court", correct: false},
            { text: "President", correct: true},
            { text: "Mayor", correct: false},
        ]
    },
    {
        question: "Which branch proposes new laws?",
        answers: [
            { text: "Judical", correct: false},
            { text: "Executive", correct: false},
            { text: "Legislative", correct: true},
            { text: "All branches", correct: false},
        ]
    },
    {
        question: "What is the Judicial branch best known as?",
        answers: [
            { text: "Supreme court", correct: true},
            { text: "President", correct: false},
            { text: "Mayor", correct: false},
            { text: "Congress", correct: false},
        ]
    },
    {
        question: "Congress is broken into how many sections?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: true},
            { text: "3", correct: false},
            { text: "4", correct: false},
        ]
    },
    {
        question: "The head of the military is the",
        answers: [
            { text: "Mayor", correct: false},
            { text: "Govenor", correct: false},
            { text: "Vice President", correct: false},
            { text: "President", correct: true},
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
        script.innerHTML = "Excellent! You are an expert in Social Study!";
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