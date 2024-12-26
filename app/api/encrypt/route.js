export async function GET() {
  const message = "The secret lies within.";
  const key = 1; // Caesar cipher shift (simple)

  // Encrypt using Caesar cipher
  const encryptedText = message.split("").map((char) => {
    if (char >= "A" && char <= "Z") {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
    } else if (char >= "a" && char <= "z") {
      return String.fromCharCode(((char.charCodeAt(0) - 97 + key) % 26) + 97);
    }
    return char;
  }).join("");

  return new Response(JSON.stringify({ key: String(key), encrypted_text: encryptedText }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
