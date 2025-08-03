// ✅ Initialize EmailJS
emailjs.init("GF1Ub06TtsTNLXVW4");

document.getElementById("email-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const button = this.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending...";

  emailjs.sendForm("service_j2rb4ee", "template_1yvv4jm", this)
    .then(() => {
      alert("✅ Mail sent successfully!");
      button.disabled = false;
      button.textContent = "Pay Now";
    })
    .catch((error) => {
      console.error("❌ Mail send failed:", error);
      alert("Failed to send mail. See console for details.");
      button.disabled = false;
      button.textContent = "Pay Now";
    });
});