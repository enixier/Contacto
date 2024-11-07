// script.js
const questions = [
    {
        question: "Wie viele unterschiedliche Artikel liegen im Regal C20?",
        answers: ["32"]
    },
    {
        question: "Wie viele Regalreihen gibt es in Halle 6?",
        answers: ["18"]
    },
    {
        question: "Kundennummer 18999: Um welchen Kunden handelt es sich hier? Tipp: Die Antwort findet ihr auch im Regal B01!",
        answers: ["SL", "sl"]
    },
    {
        question: "Finde das Produkt mit der Artikelnummer 2101/500. In welchem Regalfach befindet es sich? Tipp: es handelt sich um einen Topf vom Hersteller Özti.",
        answers: ["D059303", "D05 93 03", "d059303", "d05 93 03"]
    },
    {
        question: "Gehe zum Palettenregalplatz P21 17 01. Welcher Artikel liegt dort?",
        answers: ["2755/380", "2755380"]
    },
    {
        question: "Wie heißt der Lieferant des GN-Behälters 5011/100? Tipp: Der Name steht auf dem Produkt, du findest es im Regalfach D07 12 03.",
        answers: ["Araven", "araven", "ARAVEN"]
    },
    {
        question: "Wie viele PCs stehen im Back Office?",
        answers: ["6"]
    },
    {
        question: "Wie Treppenstufen gibt es im gesamten Bürogebäude?",
        answers: ["134"]
    },
    {
        question: "Wie viele Glastüren befinden sich im Bürogebäude?",
        answers: ["12"]
    },
    {
        question: "Gehe zum Regal mit den meisten Ebenen im Kommissionierlager (Hallen 1+2). Wie viele Ebenen hat es?",
        answers: ["10"]
    }
];

let currentQuestionIndex = 0;
let startTime;
let elapsedTime = 0;
let timerInterval;

// Funktion zum Mischen des Arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialisiere die Fragenliste mit zufälliger Reihenfolge für die ersten 9 Fragen
function initializeQuestions() {
    const firstNineQuestions = questions.slice(0, 9);
    shuffle(firstNineQuestions);
    questions.splice(0, 9, ...firstNineQuestions);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    document.getElementById("timer").textContent = `Zeit: ${minutes}m ${seconds}s`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");

    // Überprüfen, ob es die letzte Frage ist
    const isFinalQuestion = currentQuestionIndex === questions.length - 1;

    questionContainer.innerHTML = `
        ${isFinalQuestion ? '<h1 class="endgegner">ENDGEGNER!</h1>' : ''}
        <h2>Aufgabe ${currentQuestionIndex + 1}</h2>
        <p>${questions[currentQuestionIndex].question}</p>
        <input type="text" id="answer-input" placeholder="Antwort hier eingeben">
    `;
}

function nextQuestion() {
    const answerInput = document.getElementById("answer-input").value.trim();
    const correctAnswers = questions[currentQuestionIndex].answers;

    // Überprüfen, ob die Eingabe zu einer der erlaubten Antworten passt (Groß-/Kleinschreibung ignorieren)
    const isCorrect = correctAnswers.some(answer => answer.toLowerCase() === answerInput.toLowerCase());

    if (isCorrect) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            stopTimer();
            showEndMessage();
        }
    } else {
        alert("Falsche Antwort. Versuche es noch einmal!");
    }
}

function showEndMessage() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <h2>Glückwunsch!</h2>
        <p>Du hast alle Aufgaben der Schnitzeljagd erfolgreich abgeschlossen!</p>
        <p>Gesamtzeit: ${formatTime(elapsedTime)}</p>
        <p>Zeige diesen Bildschirm vor, um deine Zeit zu erfassen.</p>
    `;
    document.getElementById("next-button").style.display = "none";
}

function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
}

// Starte die erste Frage und den Timer beim Laden der Seite
window.onload = function() {
    initializeQuestions();
    showQuestion();
    startTimer();
};