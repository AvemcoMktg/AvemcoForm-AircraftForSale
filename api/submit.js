export default async function handler(req, res) {

  console.log("METHOD:", req.method);
  console.log("BODY:", req.body);
  console.log("ENV KEY EXISTS:", !!process.env.RESEND_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    const data = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "AVEMCO Quote <onboarding@resend.dev>",
        to: [
          "avemcomarketing@avemco.com",
          "avemco@avemco.com"
        ],
        subject: "New Aircraft Insurance Quote Request",

        html: `
          <h2>New Quote</h2>
          <p>${JSON.stringify(data)}</p>
        `
      })
    });

    const result = await response.json();

    console.log("RESEND RESULT:", result);

    if (!response.ok) {
      return res.status(500).json(result);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
