function login(userText, passText) {
    var status
    var user = document.getElementById(userText).value
    var pass = document.getElementById(passText).value
    var outElement = document.getElementById('login-pass-output')
    if (user.length === 0 || pass.length === 0) {
        outElement.innerHTML = "Invalid credentials"
        return
    }
    outElement.innerHTML = ""
    window.open("course.html", "_self")
    // TODO: dej tu port
    // fetch("localhost/login:PORT", {
    //     method: "POST",
    //     body: {
    //         username: user,
    //         password: pass
    //     }
    // })
    // .then((response) => {
    //     if (typeof response === 'object' && response !== null) {
    //         return response
    //     }
    //     return response.json()
    // })
    // .then((msg) => {
    //     status = msg.status
    //     console.log(msg.status)
    // })
    // if (statusOk(status)) {
    //     //window.open("index.html", "_self");
    // }
}

function statusOk(status) {
    return status >= 200 && status < 300
}