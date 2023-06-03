// Initial data

let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// Events

document.querySelector(".scoreArea button").addEventListener("click", resetEvent)

// Functions

function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion]

        let percent = Math.floor((currentQuestion / questions.length) * 100)   // barra de progresso. na pergunta 1 é proposital que ela não apareça (começa do 0 e se multiplica) Math.floor por causa de navegador.
        document.querySelector(".progress--bar").style.width = `${percent}%`

        document.querySelector(".scoreArea").style.display = "none"
        document.querySelector(".questionArea").style.display = "block"

        document.querySelector(".question").innerHTML = q.question
        document.querySelector(".options").innerHTML = ""
        
        
        let optionsHtml = ""                // evita manipular o DOM (query) muitas vezes, o que custa otimização. assim apenas substitui o valor e depois manipula 1x só
        for(let i in q.options) {
           optionsHtml+= `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`   // parseInt pra transformar em number e fazer o +1. data-op pra pegar o valor da alternativa.
        }   
        document.querySelector(".options").innerHTML = optionsHtml

        document.querySelectorAll(".options .option").forEach(item => {
            item.addEventListener("click", optionClickEvent)
        })


    } else {
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute("data-op"))      // parseInt por que o answer que é a info. que quero é um number, nao uma string

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++
    } 

    currentQuestion++       // passa pra próxima pergunta
    showQuestion()          // atualiza as perguntas
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if(points < 30) {
        document.querySelector(".scoreText1").innerHTML = "Tá ruim em?"
        document.querySelector(".scorePct").style.color = "#F00"
    } else if(points >= 30 && points < 70) {
        document.querySelector(".scoreText1").innerHTML = "Muito bom!"
        document.querySelector(".scorePct").style.color = "#FF0"
    } else if (points >= 70) {
        document.querySelector(".scoreText1").innerHTML = "Parabéns!"
        document.querySelector(".scorePct").style.color = "#0D630D"
    }

    document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    document.querySelector(".scoreArea").style.display = "block"
    document.querySelector(".questionArea").style.display = "none"
    document.querySelector(".progress--bar").style.width = `100%`
}

function resetEvent() {
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}