function sendConfirmationEmail(name, email, totalAmount, productName, quantity) {
  emailjs.send("service_j2rb4ee", "template_1yvv4jm", {
    name,
    user_email: email,
    products: productName,
    quantity,
    amount: `₹${totalAmount.toFixed(2)}`
  }).then(() => {
    console.log("Email sent from Razorpay handler");
  }).catch((err) => {
    console.error(" Email failed:", err);
  });
}

function payNow() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please enter name and email.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const productName = cart.map(item => item.name).join(", ");
  const quantity = cart.map(item => item.quantity || 1).join(", ");

  const options = {
    key: "rzp_live_5zGcQfdmP7n2fV",
    amount: totalAmount * 100,
    currency: "INR",
    name: "AlokMart",
    description: "Order Payment",
    handler: function (response) {
      sendConfirmationEmail(name, email, totalAmount, productName, quantity);
      localStorage.removeItem("cart");
      alert("Payment Successful and Email Sent!");
      window.location.href = "index.html";
    },
    prefill: { name, email },
    theme: { color: "#198754" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}