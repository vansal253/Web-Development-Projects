document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("box");
    const productList = document.getElementById("product-list");
    const cartItem = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const chekoutBtn = document.getElementById("checkout-button");
    const totalPricing = document.getElementById("total-price");

    const products = [

        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    const cart = [];

    products.forEach((p) => {
        const productDivCreation = document.createElement("div");
        productDivCreation.classList.add("product");
        productDivCreation.innerHTML = `
       <p class="text-white text-left text-xl  w-90 flex justify-between mb-6 bg-gray-600 p-3 rounded-sm box-border">${p.name} - ${p.price} <button id="${p.id}"
                        class=" bg-blue-400 hover:bg-blue-500 text-white rounded-sm w-30 p-1 box-border">Add
                        to cart</button></p>
        `;
        productList.appendChild(productDivCreation);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const getProductId = parseInt(e.target.getAttribute("id"));
            const addProduct = products.find((p) => p.id === getProductId);
            addToCart(addProduct);
        };
    });

    function addToCart(addProduct) {
        cart.push(addProduct);  // pushing products into cart [] array
        //first time calling renderCart function here
        renderCart();
    };
    function renderCart() {
        cartItem.innerText = "";
        // emptyCart.innerHTML.add("hidden");
        let totalPrice = 0;

        if (cart.length > 0) {       //here we are checking cart array whethere it is empty or not
            emptyCart.classList.add("hidden");
            cartTotal.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice = totalPrice + item.price;       //here we are extraacting price from pushed items in cart(from adToCart function cart.push(addProduct))
                const cartThing = document.createElement("div");
                cartThing.classList.add("text-white", "text-l", "my-3");
                cartThing.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)}
                `;
                cartItem.appendChild(cartThing);
                totalPricing.textContent = `$${totalPrice.toFixed(2)}`;
            });

        }
        else {
            emptyCart.classList.remove("hidden");
            totalPricing.textContent = `$0.00`;
        }

    };

    chekoutBtn.addEventListener("click", () => {
        cart.length = 0;
        alert("Checkout successfully");
        renderCart();
    });

});