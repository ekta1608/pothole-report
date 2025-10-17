console.log("Script loaded!");

const form = document.getElementById("reportForm");
const message = document.getElementById("message");

// Basic form submit logic with timeout for message
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Clear any previous message
  message.textContent = "";

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3100/report", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      message.textContent = data.message || "✅ Report submitted successfully!";
      form.reset();
      // Success message stays for 8 seconds
      setTimeout(() => {
        message.textContent = "";
      },800000);
    } else {
      let errorMessage = "⚠️ Failed to submit report";
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch(e) {}
      message.textContent = errorMessage;
      // Error message stays for 8 seconds
      setTimeout(() => {
        message.textContent = "";
      }, 10000);
    }
  } catch (error) {
    message.textContent = "⚠️ Could not connect to backend";
    setTimeout(() => {
      message.textContent = "";
    }, 8000);
  }
});
