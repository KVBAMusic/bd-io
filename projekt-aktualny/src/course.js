let input = ""
let score = 0;
let words = []
let numwords = 0
let failedWords = []
const inputId = "course-input"
const wordDisplayId = "course-word-display"
const scoreCounterId = "course-score-counter"
const statusId = "course-word-status"

window.onload = () => {
}

document.addEventListener('keydown', start, true)

function start(event) {
    if (event.key == "Enter") {
        roundCounter = 0
        words = [...getwords(10)]
        // words = [...getdebugwords()]
        score = 0
        numwords = words.length
        updateword()
        updatescore()
        document.removeEventListener('keydown', start, true)
        document.addEventListener('keydown', course, true)
    }
}

function course(event) {
    switch (event.key) {
        case "Shift":      case "Alt":        case "Control":   case "Escape":
        case "CapsLock":   case "ArrowUp":    case "ArrowDown": case "F8":
        case "ArrowLeft":  case "ArrowRight": case "NumLock":   case "F12":
        case "ScrollLock": case "F1":         case "F2":        case "F3":
        case "F4":         case "F5":         case "F6":        case "F7":
        case "F9":         case "F10":        case "F11":       case "Meta":
        case "PageUp":     case "PageDown":   case "Home":      case "End":
        case "Insert":     case "Clear":      case "AltGraph":
            break;
        case "Tab":
            input += '\t'
            break
        case "Enter":
            // check if correct
            if (input == words[0].translation) {
                score += 1
                updatescore()
                document.getElementById(statusId).innerHTML = "Dobrze!";
            }
            else {
                failedWords.push(words[0])
                document.getElementById(statusId).innerHTML = "Spróbuj jeszcze raz";
            }
            document.removeEventListener('keydown', course, true)
            sleep(1000).then(() => {
                document.getElementById(statusId).innerHTML = ""
                words.shift()
                input = ""
                document.getElementById(inputId).innerHTML = input
                if (words.length == 0) {
                    if (failedWords.length > 0) {
                        words = failedWords
                        failedWords = []
                        document.addEventListener('keydown', course, true)
                        updateword()
                        return
                    }
                    document.getElementById(wordDisplayId).innerHTML = "<p class=\"course-info\">Wspaniale!</p><p class=\"course-info\">Aby spróbować jeszcze raz, naciśnij klawisz ENTER</p>"
                    document.addEventListener('keydown', start, true)
                    return
                }
                document.addEventListener('keydown', course, true)
                updateword()
            })
            break
        case "Backspace":
        case "Delete":
            input = input.substring(0, input.length - 1)
            break
        case "Dead":
            break
        default:
            input += event.key
            break;
    }
    document.getElementById(inputId).innerHTML = input
}

function* getwords(numwords) {
    let i = 0
    while (i < numwords) {
        yield getnextword()
        i += 1
    }
}

function* getdebugwords() {
    let i = 0
    while (i < 8) {
        yield generateRandomWord()
        i += 1
    }
}

function getnextword() {
    let word = {
        word: "",
        translation: "",
        category: "",
    }
    fetch("localhost:8000/get_word", {
        method: "POST",
        body: JSON.stringify({
            id: localStorage.getItem("userID")
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        return null
    })
    .then(json => {
        if (json === null) {
            return
        }
        // alert(json)
        // return
        word.word = json.word
        word.translation = json.translation
        word.category = json.category
    })
    .catch(err => {
        alert(err)
    })
    return word
}

function updateword() {
    let word = words[0]
    let wordDisplay = document.getElementById(wordDisplayId)
    wordDisplay.innerHTML = `<span class="course-word">${word.word}</span>`
}

function updatescore() {
    document.getElementById(scoreCounterId).innerHTML = `${score}/${numwords}`
}

function generateRandomWord() {
    let wordsLocal = [
        "cow",
        "dog",
        "cat",
        "sheep",
        "apple",
        "orange",
        "carrot",
        "mouse",
    ]
    let translationsLocal = [
        "krowa",
        "pies",
        "kot",
        "owca",
        "jabłko",
        "pomarańcza",
        "marchewka",
        "mysz",
    ]
    let idx = Math.floor(Math.random() * wordsLocal.length)
    return {
        word: wordsLocal[idx],
        translation: translationsLocal[idx],
        category: ""
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


