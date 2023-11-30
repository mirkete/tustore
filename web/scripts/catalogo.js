const actualURL = new URL(window.location.href)
const queryURL = actualURL.origin + "/products/user-products"
const tableBody = document.getElementById("table-body")
const token = localStorage.getItem("token")
const modal = document.getElementById("modal")
const modalActivator = document.getElementById("modal-activator")
const close = document.getElementById("close")
const newProdForm = document.getElementById("new-product-form")
const table = document.getElementById("table")
const catalogoSection = document.getElementById("catalogo-section")
const name = document.getElementById("name")
const price = document.getElementById("price")
const imageList = document.getElementById("image")


function showNoProducts(){
    table.style.display = "none"
    catalogoSection.insertAdjacentHTML("beforeend", `<strong id="no-products" style="align-self:center;">Todavia no tienes productos 😢 </strong>`)
}

function closeModal(){
    modal.style.display = "none"
}


modalActivator.addEventListener("click", () => {
    modal.style.display = "grid"
})

let lastProductIndex = 0

function generateProduct(product, i){
    if(table.style.display === "none"){
        table.style.display = "table"
        document.getElementById("no-products").style.display = "none"
    }
    const {product_name:name, product_price:price} = product
    const template = `<tr><td>${i+1}</td><td class="product-name">${name}</td><td>$${price}</td><td></td></tr>` 
    
    lastProductIndex = i
    tableBody.insertAdjacentHTML("beforeend", template)
}

function createProduct({name, price, image}){
    const formData = new FormData()
    formData.set("name", name)
    formData.set("price", price)
    formData.set("image", image)
    
    fetch(actualURL.origin + "/products/add-product", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`
    },
    body: formData
    })
    .then((res) => {
    if(res.status === 201) return res.json()
    closeModal()
    }).then((data) => {
    generateProduct({product_name: data.name, product_price:data.price}, lastProductIndex)
    closeModal()
    })
    .catch((err) => {
    closeModal()
    })
}

close.addEventListener("click", () => closeModal())

window.addEventListener("click", (e) => {
    if(e.target == modal) closeModal()
})

newProdForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const image = imageList.files[0]
    if(name.value && price.value && image){
    createProduct({name:name.value, price: price.value, image})
    }
})

fetch(queryURL, {
    headers: {
    "Authorization": `Bearer ${token}`
    }
})
.then((res) => {
    if (!res.ok) throw new Error("Ha ocurrido un error")
    return res.json()
})
.then((products) => {
    if(products.length === 0){
    return showNoProducts()
    }
    products.forEach((product, i) => generateProduct(product, i))
})