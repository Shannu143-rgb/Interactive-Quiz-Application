const questions=[
    {
        question:"Who is the current President of the United States?",
        answers:[
           {text:"Joe Biden",correct:false},
           {text:"Kamala Harris",correct:false},
           {text:"Donald Trump",correct:true},
           {text:"Barack Obama",correct:false},
        ],
    },
    {
        question:"What is the chemical symbol for gold?",
        answers:[
            {text:"Au",correct:true},
            {text:"Ag",correct:false},
            {text:"Pb",correct:false},
            {text:"Hg",correct:false},
        ],
    },
    {
        question:"Which ocean is the largest in the world by surface area?",
        answers:[
            {text:"Atlantic Ocean",correct:false},
            {text:"Indian Ocean",correct:false},
            {text:"Arctic Ocean",correct:false},
            {text:"Pacific Ocean",correct:true},
        ],
    },
    {
        question:"Who was the first woman to win a Nobel Prize?",
        answers:[
            {text:"Marie Curie",correct:true},
            {text:" Mother Teresa",correct:false},
            {text:" Rosalind Franklin ",correct:false},
            {text:"Ada Lovelace",correct:false},
        ],
    },
    {
        question:"What is the tallest mountain in the world?",
        answers:[
            {text:"K2",correct:false},
            {text:"Mount Kilimanjaro ",correct:false},
            {text:"Mount Everest",correct:true},
            {text:"Mount McKinley",correct:false},
        ],
    },
]

let currentQuestionIndex=0; 
let score=0;

const startButton=document.querySelector(".start-btn");
const WelcomeScreen=document.querySelector(".welcome-screen");
const QuizScreen=document.querySelector(".quiz-screen");
const questionEl=document.querySelector(".question"); 
const answersButton=document.querySelector(".answers-container");
const nextButton=document.querySelector(".next-btn");

startButton.addEventListener("click",startQuiz);

function startQuiz(){
    WelcomeScreen.style.display="none"; 
    QuizScreen.style.display="flex";   
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    nextButton.style.display='none';
    displayQuestion();                 
}

function displayQuestion(){
    resetContainer();
    questionEl.textContent=questions[currentQuestionIndex].question;   
    
    questions[currentQuestionIndex].answers.forEach(answer=>{    
        const buttonEl=document.createElement("button");
        buttonEl.innerHTML=answer.text;
        buttonEl.classList.add("ans-btn");
        answersButton.appendChild(buttonEl);        

        if(answer.correct){
            buttonEl.dataset.correctAns=answer.correct;              
        }
        
        buttonEl.addEventListener("click",checkAnswer);
    });
}

function checkAnswer(e){
    const selectedBtn=e.target;
    if(selectedBtn.dataset.correctAns){
        score++;
        console.log(score);
        selectedBtn.classList.add("correct-ans");
    }
    else{
        selectedBtn.classList.add("incorrect-ans");
    }

    Array.from(answersButton.children).forEach(button=>{
    if(button.dataset.correctAns==='true'){
        button.classList.add("correct-ans");
    }

    button.disabled='true';         

   });

   nextButton.style.display="block";        
}

function displayResult(){
    resetContainer();
    questionEl.innerHTML=`Quiz is Completed! <br> Your Score:<span class="score">${score}/${questions.length}</span>`;
    nextButton.innerHTML='Play Again';
}


function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        displayQuestion();
        nextButton.style.display='none';
    }
    else{
        displayResult();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        nextQuestion();
    }
    else{
        startQuiz();
    }
});

function resetContainer(){
    questionEl.textContent='';
    answersButton.innerHTML='';
}



