document.getElementById("quoteForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const data = Object.fromEntries(formData.entries());

  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert("Quote request sent!");
    this.reset();
  } else {
    alert("Something went wrong.");
  }
});
