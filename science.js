const questions = [
    {
        question: "Oil, natural gas and coal are examples of …",
        answers: [
            { text: "Renewable resources", correct: false},
            { text: "Geothermal resources", correct: false},
            { text: "Biofuels", correct: false},
            { text: "Fossil fuels", correct: true},
        ]
    },
    {
        question: "A scientist is conducting a study to determine how well a new medication treats ear infections. The scientist tells the participants to put 10 drops in their infected ear each day. After two weeks, all participants' ear infections had healed. Which of the following changes to the design of this study would most improve the ability to test if the new medication effectively treats ear infections?",
        answers: [
            { text: "Have participants use ear drops for only one week", correct: false},
            { text: "Create a second group of participants with ear infections who use 15 drops a day", correct: false},
            { text: "Create a second group of participants with ear infections who do not use any ear drops", correct: true},
            { text: "Have participants put ear drops in both their infected ear and healthy ear", correct: false},
        ]
    },
    {
        question: "Which of the following is an example of genetic engineering?",
        answers: [
            { text: "Growing a whole plant from a single cell", correct: false},
            { text: "Finding the sequences of bases in plant DNA", correct: false},
            { text: "Inserting a gene into plants that makes them resistant to insects", correct: true},
            { text: "Attaching the root of one type of plant to the stem of another type of plant", correct: false},
        ]
    },
    {
        question: "What is the main cause of seasons on the Earth?",
        answers: [
            { text: "The tilt of the Earth's axis in relation to the sun", correct: true},
            { text: "Changes in the amount of energy coming from the sun", correct: false},
            { text: "The distance between the Earth and the sun", correct: false},
            { text: "The speed that the Earth rotates around the sun", correct: false},
        ]
    },
    {
        question: "The time a computer takes to start has increased dramatically. One possible explanation for this is that the computer is running out of memory. This explanation is a scientific…",
        answers: [
            { text: "Observation", correct: false},
            { text: "Experiment", correct: false},
            { text: "Conclusion", correct: false},
            { text: "Hypothesis", correct: true},
        ]
    },
    {
        question: "Many diseases have an incubation period. Which of the following best describes what an incubation period is?",
        answers: [
            { text: "The period during which someone builds up immunity to a disease", correct: false},
            { text: "The recovery period after being sick", correct: false},
            { text: "The period during which someone has an infection, but is not showing symptoms", correct: true},
            { text: "The effect of a disease on babies", correct: false},
        ]
    },
    {
        question: "When large areas of forest are removed so land can be converted for other uses, such as farming, which of the following occurs?",
        answers: [
            { text: "Decreased carbon dioxide", correct: false},
            { text: "Increased erosion", correct: true},
            { text: "Colder temperature", correct: false},
            { text: "Greater oxygen production", correct: false},
        ]
    },
    {
        question: "An antacid relieves an overly acidic stomach because the main components of antacids are …",
        answers: [
            { text: "Bases", correct: true},
            { text: "Acids", correct: false},
            { text: "Isotopes", correct: false},
            { text: "Neutral", correct: false},
        ]
    },
    {
        question: "Which of these is a major concern about the overuse of antibiotics?",
        answers: [
            { text: "It can lead to antibiotic-resistant bacteria", correct: true},
            { text: "Antibiotics can cause secondary infections", correct: false},
            { text: "Antibiotics will get into the water system", correct: false},
            { text: "There will be an antibiotic shortage", correct: false},
        ]
    },
    {
        question: "A car travels at a constant speed of 40 miles per hour. How far does the car travel in 45 minutes?",
        answers: [
            { text: "25 miles", correct: false},
            { text: "30 miles", correct: true},
            { text: "35 miles", correct: false},
            { text: "40 miles", correct: false},
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
        script.innerHTML = "Excellent! You are an expert in Science!";
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