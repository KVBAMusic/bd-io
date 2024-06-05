let input = ""
let lastTimestamp, startTimestamp = -1
const inputId = "course-input"

window.onload = () => {
    alert("dupa")
}

document.addEventListener('keydown', function (event) {
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
            break
        case "Backspace":
        case "Delete":
            input = input.substring(0, input.length - 1)
            break
        case "Dead":
            input += "~"
            break
        default:
            input += event.key
            break;
    }
    document.getElementById(inputId).innerHTML = input
}, true)


function frame(timestamp, duration) {
    if (startTimestamp == -1) {
        startTimestamp = timestamp
    }
    let delta = timestamp - last
    last = timestamp
    let t = (timestamp - startTimestamp) / duration

    if (t < 1) {
        window.requestAnimationFrame((timestamp) => frame(timestamp, 1000))
    }
}

window.requestAnimationFrame((timestamp) => frame(timestamp, 1000))

