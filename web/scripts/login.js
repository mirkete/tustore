const loginForm = document.getElementById("login-form")
const username = document.getElementById("username")
const password = document.getElementById("password")
const actualUrl = new URL(window.location.href)

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if(username.value && password.value){
    fetch(actualUrl.origin + "/login", {
        method: "POST",
        body: JSON.stringify({username: username.value, password: password.value}),
        headers: {
        "Content-Type": "application/json"
        }
    }).then((res) => {
        if(!res.ok) throw new Error(res.statusText) 
        return res.text()
    }).then((token) => {
        window.localStorage.setItem("token", token)
        window.location.replace(actualUrl.origin)
    }).catch((e) => {
        console.error(e)
    })
    username.value = ""
    password.value = ""
    }
})