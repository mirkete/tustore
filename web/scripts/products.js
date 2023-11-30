const actualURL = new URL(window.location.href)
const productsApiURL = actualURL.origin + "/products"
const productsSection = document.getElementById("products-section")
const searchForm = document.getElementById("search-form")
const searchContent = document.getElementById("search-content")

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchValue = searchContent.value
    if(searchValue){
        const searchURL = actualURL.origin + `/products?name=${searchValue}`
        fetch(searchURL)
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json()
        })
        .then((products) => {
            productsSection.innerHTML = ""
            products.forEach((product) => generateProduct(product))
        })
    }
    searchContent.value = ""
})

function generateProduct(product){
    const {product_name:name, product_price:price, product_image:imageURL} = product
    const productHTML = `<article class="product">
        <figure class="product-image">
        <img src="${imageURL}" alt="">
        </figure>
        <div class="product-description">
        <h1 class="small-text">${name}</h1>
        <p class="normal-text price">$${price}</p>
        <button class="button button-primary product-button">Añadir al carrito</button>
        </div>
    </article>`

    productsSection.innerHTML += productHTML
}

fetch(productsApiURL)
.then((res) => {
    if(!res.ok) throw new Error()
    return res.json()
})
.then((products) => {
    products.forEach((product) => generateProduct(product))
})