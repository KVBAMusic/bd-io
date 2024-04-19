function login(userText, passText) {
    var user = document.getElementById(userText).value;
    var pass = document.getElementById(passText).value;
    var outElement = document.getElementById('login-pass-output');
    if (user.length === 0 || pass.length === 0) {
        outElement.innerHTML = "Invalid credentials";
        return false;
    }
    // tutaj daj request do backendu żeby zweryfikował
    outElement.innerHTML = "";
    window.open("index.html", "_self");
    return true;
}
