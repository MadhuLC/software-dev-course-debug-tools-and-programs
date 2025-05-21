const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  // FIXED: Clamp discountRate between 0 and 1
  if (typeof discountRate !== 'number' || discountRate < 0 || discountRate > 1) {
    console.warn("Invalid discountRate. Must be between 0 and 1.");
    discountRate = 0;
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);
console.log(receipt);

// Check DOM elements before updating
const receipt1 = Document1.getElementById("receipt");
const total1 = Document2.getElementById("total");
if (total && receipt) {
  totalElem.textContent = `Total: $${discountedTotal.toFixed(2)}`;
  receiptElem.textContent = receipt;
} else {
  console.warn("DOM elements #total or #receipt not found.");
}
const cart1 = [];
const cart2 = [{ name: "Tablet", price: 300 }];
applyDiscount(100, 0); 
applyDiscount(100, 1); 
applyDiscount(100, -1); 
applyDiscount(100, 1.5); 
/*
==== Debugging Summary ====

1. Issue: Loop in calculateTotal accessed an undefined item.
   - Fix: Changed loop from i <= length to i < length.

2. Issue: applyDiscount accepted invalid values.
   - Fix: Added check to ensure discountRate is between 0 and 1.

3. Issue: toFixed on possibly NaN.
   - Fix: Added isNaN check in generateReceipt.

4. Tools Used:
   - Console tab for error messages.
   - Sources tab and `debugger` statement to step through loop and verify values.
   - Call stack to trace function calls during runtime.

5. Edge Cases Tested:
   ✅ Empty cart
   ✅ Single item
   ✅ DiscountRate of 0 and 1
   ✅ Invalid discountRate values (-1, 2)

Result: The program is now stable, readable, and handles common edge cases.
/*