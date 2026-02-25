export async function handler(event) {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {

    const { payload } = JSON.parse(event.body || "{}");

    if (!payload) {
      return { statusCode: 400, body: "No payload" };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return { statusCode: 500, body: "Missing API Key" };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "tuwebexpress.hco@gmail.com",
        subject: "Mensaje cifrado EZEE",
        text: payload
      })
    });

    const result = await response.text();

    if (!response.ok) {
      return {
        statusCode: 500,
        body: `Resend error: ${result}`
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (e) {

    return {
      statusCode: 500,
      body: `Server error: ${e.message}`
    };

  }
}
