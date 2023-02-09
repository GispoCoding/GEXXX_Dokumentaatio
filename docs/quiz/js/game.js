const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const section = localStorage.getItem('Section')
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let questionNumber = 0;
let MAX_QUESTIONS = 0;

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

questionsToFetch = `js/questions${section}.json`
fetch(questionsToFetch)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        MAX_QUESTIONS = questions.length;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
    
//CONSTANTS
const CORRECT_BONUS = 1;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('maxScore', MAX_QUESTIONS);
        //go to the end page
        return window.location.assign('end.html');
    }
    progressBarFull.style.width = `${((questionCounter / MAX_QUESTIONS) * 100)-1.5}%`;
    questionCounter++;
    progressText.innerText = `Kysymys ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(choices.length);
        for (let i = 0; i < (choices.length); i++) {
            if ((i+1) == currentQuestion.answer) {
                choices[i].parentElement.classList.add('correct');
            }
        };

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            for (let i=0; i <(choices.length); i++) {
                choices[i].parentElement.classList.remove('correct');
                choices[i].parentElement.classList.remove('incorrect');
            };
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};