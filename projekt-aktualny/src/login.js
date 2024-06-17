async function login(userText, passText) {
    var status
    var user = document.getElementById(userText).value
    var pass = document.getElementById(passText).value
    var outElement = document.getElementById('login-pass-output')
    if (user.length === 0 || pass.length === 0) {
        outElement.innerHTML = "Invalid credentials"
        return
    }
    outElement.innerHTML = ""
    // for debug purposes
    // let data = {id: 1234}
    // localStorage.setItem("userID", data.id)
    // window.open("course.html", "_self");
    // return
    const response = await fetch("localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
    if (response.ok) {
        let data = await response.json()
        localStorage.setItem("userID", data.id)
        window.open("course.html", "_self");
        return
    }
    outElement.innerHTML = "Invalid credentials"
        
}

async function register(userText, emailText, passText) {
    var user = document.getElementById(userText).value
    var pass = document.getElementById(passText).value
    var email = document.getElementById(emailText).value

    if (user.length === 0 || pass.length === 0 || email.length === 0) {
        alert("Nazwa użytkownika, email, lub hasło nie zostało podane")
        return
    }
    const response = await fetch("localhost:8000/register", {
        method: "POST",
        body: JSON.stringify({
            username: user,
            password: pass,
            email: email
        })
    })
    if (response.ok) {
        let data = await response.json()
        localStorage.setItem("userID", data.id)
        window.open("course.html", "_self");
        return
    }
    alert("Błąd podczas rejestracji")
}