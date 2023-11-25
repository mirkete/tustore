const registerForm = document.getElementById("register-form")
const username = document.getElementById("username")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const actualUrl = new URL(window.location.href)

registerForm.addEventListener("submit", (e) => {
e.preventDefault()
if(username.value && password.value){
    fetch(actualUrl.origin + "/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username:username.value, 
        password:password.value
    })
    })
    .then((res) => {
    try{
        return res.text()
    } catch(e){
        throw e
    }
    })
    .then((token) => {
    localStorage.setItem("token", token)
    window.location.replace(actualUrl.origin)
    })
    .catch((err) => console.error(err))

    username.value = ""
    password.value = ""
    passwordConfirmation
}
})