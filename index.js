const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let storedAnswer;

let score = parseInt(localStorage.getItem('score')) || 0; // Initialize score from localStorage or default to 0
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
    const randomNumber1 = randomNumber(1, 10);
    const randomNumber2 = randomNumber(1, 10);
    const questionType = randomNumber(1, 4);

    let firstNumber;
    let secondNumber;

    if(randomNumber1 > randomNumber2 && questionType > 2){
        firstNumber = randomNumber1;
        secondNumber = randomNumber2;
    } else {
        firstNumber =randomNumber2;
        secondNumber= randomNumber1;
    }


    let question;
    let answer;

    // const question = `Q. What is ${randomNumber1} multiply by ${randomNumber2}?`;
    // const answer = randomNumber1 * randomNumber2;

    switch (questionType) {
        case 1: 
        question = `Q. What is ${firstNumber} multiply by ${secondNumber}?`;
        answer = firstNumber * secondNumber;
        break;

        case 2: 
        question = `Q. What is ${firstNumber} added by ${secondNumber}?`;
        answer = firstNumber + secondNumber;
        break;
        
        case 3: 
        question = `Q. What is ${firstNumber} subtracted by ${secondNumber}?`;
        answer = firstNumber - secondNumber;
        break;

        case 4: 
        question = `Q. What is ${firstNumber} devided by ${secondNumber}?`;
        answer = firstNumber / secondNumber;
        break;
    }

    return { question, answer };   
};

const showQuestion = () => {
    const { question, answer } = generateQuestion();
    questionEl.innerText = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
};
showQuestion();

const checkAnswer = (event) => {
    event.preventDefault();
    const formData = new FormData(questionFormEl);

    const userAnswer = +formData.get("answer");
    if (userAnswer == storedAnswer) {
        score += 1;
        Toastify({
            text: `Your are Correct and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();   
    }
    else {
        score -= 1;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            },
          }).showToast();
    }
    scoreEl.innerText = score;
    localStorage.setItem('score' , score);
    event.target.reset();
    showQuestion();

};