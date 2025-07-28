// Sample Menu Data
const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 10.99, image: "images/pizza.jpg" },
    { id: 2, name: "Burger & Fries", price: 8.99, image: "images/burger.jpg" },
    { id: 3, name: "Sushi Platter", price: 15.99, image: "images/sushi.jpg" },
];

let cart = [];

// Load Menu
function loadMenu() {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    cart.push(item);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} - $${item.price.toFixed(2)}</p>
        </div>
    `).join("");
    document.getElementById("cart-count").textContent = cart.length;
}

// Checkout (Firebase)
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) return alert("Cart is empty!");
    
    const db = firebase.firestore();
    db.collection("orders").add({
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Order placed successfully!");
        cart = [];
        updateCart();
    });
});

// Initialize
loadMenu();
