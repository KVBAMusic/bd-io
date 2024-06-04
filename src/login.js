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
    // window.open("course.html", "_self")
    // TODO: dej tu port
    const response = await fetch("localhost:8000/login", {
        method: "POST",
        body: {
            username: user,
            password: pass
        }
    })
    console.log(response.json())
    if (statusOk(response)) {
        window.open("course.html", "_self");
    }
    else {
        outElement.innerHTML = "Invalid credentials"
        return        
    }
}

function statusOk(status) {
    return status >= 200 && status < 300
}