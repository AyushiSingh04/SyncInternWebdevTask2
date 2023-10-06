let timeLeft = document.querySelector(".timeleft");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("nextbutton");
let countOfQuestion = document.querySelector(".numques");
let displayContainer = document.getElementById("displaycontainer");
let scoreContainer = document.querySelector(".scorecontainer");
let restart = document.getElementById("restart");
let userScore = document.getElementById("userscore");
let startScreen = document.querySelector(".startpage");
let startButton = document.getElementById("startbutton");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id: "0",
        question: "What is 2 + 2?",
        options: ["5", "7", "3", "4"],
        correct: "4",
    },
    {
        id: "1",
        question: "What is the powerhouse of the cell?",
        options: ["cell wall", "mitochondria", "nucleus", "DNA"],
        correct: "mitochondria",
    },
    {
        id: "2",
        question: "When did India get it's independence?",
        options: ["1947", "1948", "1847", "2000"],
        correct: "1947",
    },
    {
        id: "3",
        question: "What is 9*9",
        options: ["10", "81", "92", "80"],
        correct: "81",
    },
    {
        id: "4",
        question: "Who is the father of India?",
        options: ["Mahatma Gandhi", "Rahul Gandhi", "Nerandra Modi", "A.P.J.Abdul Kalam"],
        correct: "Mahatma Gandhi",
    },
    {
        id: "5",
        question: "What is the longest running film in the history of Indian cinema?",
        options: ["Kuch Kuch Hota Hai", "Hum Saath Saath Hai", "Kal Ho Na Ho", "Dilwale Dulhania Le Jayenge"],
        correct: "Dilwale Dulhania Le Jayenge",
    },
    {
        id: "6",
        question: "If I was born 10 years back then how old will I be today?",
        options: ["20", "8", "10", "Don't know"],
        correct: "10",
    },
    {
        id: "7",
        question: "What is Ram's son's daughter's grandfather's name?",
        options: ["Rohit", "Ram", "Rahul", "Don't know"],
        correct: "Ram",
    },
    {
        id: "8",
        question: "What does HTML Stand for?",
        options: ["HyperText Markup Language", "HyperText Machine Language", "Hightext Markup Language", "Hightext Machine Language"],
        correct: "HyperText Markup Language",
    },
    {
        id: "9",
        question: "What month only has 28 days?",
        options: ["Feb", "March", "Jan", "Jun"],
        correct: "Feb",
    },
];
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
nextBtn.addEventListener(
    "click",
    (displayNext = () => {

        questionCount += 1;

        if (questionCount == quizArray.length) {

            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");

            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {

            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";

            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });

    quizCards[questionCount].classList.remove("hide");
};
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {

        i.options.sort(() => Math.random() - 0.5);

        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

        let questionDIV = document.createElement("p");
        questionDIV.classList.add("question");
        questionDIV.innerHTML = i.question;
        div.appendChild(questionDIV);

        div.innerHTML += `
    <button class="optiondiv" onclick="checker(this)">${i.options[0]}</button>
     <button class="optiondiv" onclick="checker(this)">${i.options[1]}</button>
      <button class="optiondiv" onclick="checker(this)">${i.options[2]}</button>
       <button class="optiondiv" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".optiondiv");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);

    options.forEach((element) => {
        element.disabled = true;
    });
}
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};



