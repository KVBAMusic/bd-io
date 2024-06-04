let input = ""
let lastTimestamp, startTimestamp = -1
const inputId = "course-input"
let score = 0

window.onload = () => {
    //TODO:
    // - fetch words from DB
    // - pick a number of random ones
    // - game start sequence with a different listener function
    alert("dupa")
}

document.addEventListener('keydown', onScreenInput, true)

function onScreenInput(event) {
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
            // TODO:
            // - game over logic
            validate()
            input = " "
            break
        case "Backspace":
        case "Delete":
            input = input.substring(0, input.length - 1)
            if (input === "") {
                input = " "
            }
            break
        case "Dead":
            input += "~"
            break
        default:
            input += event.key
            break;
    }
    document.getElementById(inputId).innerHTML = input
}

function validate() {
    // TODO:
    // - check if correct
    score += 1
    document.getElementById("course-score-counter").innerHTML = score + "/10"
}

function frame(timestamp, duration) {
    if (startTimestamp == -1) {
        startTimestamp = timestamp
    }
    last = timestamp
    let t = (timestamp - startTimestamp) / duration

    if (t < 1) {
        window.requestAnimationFrame((timestamp) => frame(timestamp, 1000))
    }
}

window.requestAnimationFrame((timestamp) => frame(timestamp, 1000))