export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "AVEMCO Form <onboarding@resend.dev>",
      to: ["youremail@example.com"],
      subject: "New AVEMCO Quote Request",
      html: `
        <h2>New Quote Request</h2>

        <p><strong>First Name:</strong> ${data.first_name}</p>
        <p><strong>Last Name:</strong> ${data.last_name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
      `
    })
  });

  const result = await response.json();

  if (!response.ok) {
    return res.status(500).json(result);
  }

  return res.status(200).json({ success: true });
}
