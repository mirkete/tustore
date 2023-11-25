const loginNav = document.getElementById("login-nav")
const token = window.localStorage.getItem("token")
const actualUrl = new URL(window.location.href)

if(token){
    fetch(actualUrl.origin + "/user-data", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
    }).then((res) => {
    if(!res.ok) throw new Error(res.status)
    return res.json()
    })
    .then((userData) => {
    loginNav.innerHTML = `
    <a class="anchor anchor-secondary anchor-nobackground" href="/catalogo">Administrar catalogo</a>
    `
    })
    .catch((e) => {console.error(e)})
}