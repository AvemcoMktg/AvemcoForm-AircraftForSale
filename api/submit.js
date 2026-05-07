export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  try {

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "AVEMCO Quote Form <onboarding@resend.dev>",
        to: [
  "avemcomarketing@avemco.com",
  "avemco@avemco.com"
]
        subject: "New Aircraft Insurance Quote Request",

        html: `
          <h2>New Aircraft Insurance Quote</h2>

          <hr />

          <h3>Contact Info</h3>
          <p><strong>First Name:</strong> ${data.first_name || ""}</p>
          <p><strong>Last Name:</strong> ${data.last_name || ""}</p>
          <p><strong>Phone:</strong> ${data.phone || ""}</p>
          <p><strong>Email:</strong> ${data.email || ""}</p>

          <hr />

          <h3>Aircraft Details</h3>
          <p><strong>Base Airport:</strong> ${data.base_airport || ""}</p>
          <p><strong>Aircraft Year:</strong> ${data.aircraft_year || ""}</p>
          <p><strong>Aircraft Make:</strong> ${data.aircraft_make || ""}</p>
          <p><strong>Aircraft Model:</strong> ${data.aircraft_model || ""}</p>

          <hr />

          <h3>Value</h3>
          <p><strong>Value Requested:</strong> ${data.value_requested || ""}</p>
        `
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(500).json(result);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
