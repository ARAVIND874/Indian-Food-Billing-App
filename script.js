const foodItems = [
    { name: "Idli-இட்லி", price: 5 },
     {name: "Dhosa-தோசை ", price: 30},
    {name: "pongal-பொங்கல் ", price: 30},
    {name: "Poori -பூரி ", price: 30},
    {name: "Chappathi-சப்பாத்தி", price: 30},
    { name: "Masala Dosa - மசாலா தோசை", price: 80 },
     { name: "Protta-புரோட்டா", price: 15 },
    { name: "Guska-குஸ்கா", price: 35 },
    { name: "Chicken Biriyani-சிக்கன் பிரியாணி", price: 120 },
    { name: "Chicken Rice-சிக்கன் ரைஸ்", price: 100 },
    { name: "Chicken Noodles-சிக்கன் நூடுல்ஸ்", price: 100 },
    { name: "Sappadu-சாப்பாடு", price: 60 }
];

function loadFoodItems() {
    const foodList = document.getElementById("food-list");
    foodItems.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.price}" min="1" onchange="updatePrice(${index}, this.value)"></td>
            <td><input type="number" value="0" min="0" id="quantity-${index}" onchange="updateTotal(${index}, this.value)"></td>
            <td id="total-${index}">0</td>
        `;
        foodList.appendChild(row);
    });
}

function updatePrice(index, newPrice) {
    foodItems[index].price = parseInt(newPrice);
    updateGrandTotal();
}

function updateTotal(index, quantity) {
    let price = foodItems[index].price;
    let total = price * quantity;
    document.getElementById(`total-${index}`).innerText = total;
    updateGrandTotal();
}

function updateGrandTotal() {
    let subtotal = 0;
    foodItems.forEach((item, index) => {
        subtotal += parseInt(document.getElementById(`total-${index}`).innerText);
    });
    document.getElementById("subtotal").innerText = subtotal;
    applyDiscount();
}

function applyDiscount() {
    let subtotal = parseInt(document.getElementById("subtotal").innerText);
    let discountPercent = parseInt(document.getElementById("discount").value);
    let discountAmount = (subtotal * discountPercent) / 100;
    let taxedAmount = (subtotal - discountAmount) * 0.05;
    document.getElementById("tax").innerText = taxedAmount.toFixed(2);
    let grandTotal = subtotal - discountAmount + taxedAmount;
    document.getElementById("grand-total").innerText = grandTotal.toFixed(2);
}

function resetBill() {
    document.querySelectorAll("input[type='number']").forEach(input => input.value = 0);
    document.getElementById("discount").value = 0;
    document.getElementById("subtotal").innerText = "0";
    document.getElementById("tax").innerText = "0";
    document.getElementById("grand-total").innerText = "0";
    foodItems.forEach((_, index) => {
        document.getElementById(`total-${index}`).innerText = "0";
    });
}

function printBill() {
    let billContent = "<h2>Bill Receipt</h2><table border='1'><tr><th>Food Item</th><th>Quantity</th><th>Total (₹)</th></tr>";
    foodItems.forEach((item, index) => {
        let quantity = document.getElementById(`quantity-${index}`).value;
        if (quantity > 0) {
            let total = document.getElementById(`total-${index}`).innerText;
            billContent += `<tr><td>${item.name}</td><td>${quantity}</td><td>${total}</td></tr>`;
        }
    });
    billContent += `</table><p><strong>Grand Total: ₹${document.getElementById("grand-total").innerText}</strong></p>`;
    let billWindow = window.open('', '_blank');
    billWindow.document.write(billContent);
    billWindow.document.close();
    billWindow.print();
}

window.onload = loadFoodItems;
 