document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shortener-form");
  const urlInput = document.getElementById("url-input");
  const result = document.getElementById("result");
  const shortenedUrlElement = document.getElementById("shortened-url");
  const copyBtn = document.getElementById("copy-btn");
  const errorMessage = document.getElementById("error-message");
  const clicksElement = document.querySelector("#clicks span");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = urlInput.value.trim();

    if (!url) return;

    try {
      errorMessage.classList.add("hidden");

      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();

      // Update the UI
      shortenedUrlElement.href = data.shortUrl;
      shortenedUrlElement.textContent = data.shortUrl;

      result.classList.remove("hidden");
    } catch (error) {
      console.error("Error:", error);
      errorMessage.classList.remove("hidden");
    }
  });

  copyBtn.addEventListener("click", () => {
    const shortenedUrl = shortenedUrlElement.textContent;

    navigator.clipboard
      .writeText(shortenedUrl)
      .then(() => {
        // Change button text temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";

        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  });
});
