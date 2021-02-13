//
// Copyright (c) 2021 James Q Quick
// https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript
//
// Copyright (c) 2021 Carlos Pardo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

const question = document.getElementById('question');
const questionImage = document.getElementById('questionImage');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
var questionBank = "yy";
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let correctAnswer = 0;

let questions = [];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  //return array;
}


function setQuestionBank(bank, title) {
  questionBank = bank;
  sessionStorage.setItem('questionBank', questionBank);
  sessionStorage.setItem('questionBankTitle', title);
}


questionBank = sessionStorage.getItem('questionBank');
fetch(questionBank)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= questions.length) {
        sessionStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${questions.length}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
    questionImage.src = currentQuestion.image;
    questionImage.width = currentQuestion.image_width;

    //shuffle(choices);
    var numbersIndex = 0;
    var numbers = ['1','2','3','4'];
    shuffle (numbers);
    correctAnswer = numbers.indexOf('1') + 1;
    correctAnswer=correctAnswer.toString();
    console.log('answerCorrect ' + correctAnswer);

    choices.forEach((choice) => {
      choice.innerText = currentQuestion['choice' + numbers[numbersIndex]];
      numbersIndex++;
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log('escolla ' + selectedAnswer);

        const classToApply =
            selectedAnswer == correctAnswer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(100.0/questions.length);
        }
        else {
            incrementScore(-33.3/questions.length);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


incrementScore = (num) => {
    score += num;
    scoreText.innerText = score.toFixed(0) + "%";
};
