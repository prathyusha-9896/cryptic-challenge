export async function POST(request) {
  try {
    const body = await request.json();
    const { decrypted_text, name, email, phone_number, user_submitted_code } = body;

    // Original message used in encryption
    const originalMessage = "The secret lies within."; // Make sure this matches your encryption route's message

    // Validate decrypted text
    if (decrypted_text === originalMessage) {
      return new Response(
        JSON.stringify({
          message: "Verification successful!",
          data: {
            name,
            email,
            phone_number,
            user_submitted_code,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Verification failed. Incorrect decryption." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error processing request", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
