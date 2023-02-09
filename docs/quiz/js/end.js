const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const maxScore = localStorage.getItem('maxScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Oikeita vastauksia: ${mostRecentScore}/${maxScore}`;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});