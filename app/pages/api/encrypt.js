export default function handler(req, res) {
    if (req.method === "POST") {
      const { decrypted_text, name, email, phone_number, user_submitted_code } = req.body;
  
      const originalMessage = "The secret lies within."; // Original message used in encryption
  
      // Normalize both strings by converting to lowercase and trimming whitespace
      if (decrypted_text.trim().toLowerCase() === originalMessage.toLowerCase()) {
        res.status(200).json({ message: "Verification successful!", user: { name, email, phone_number, user_submitted_code } });
      } else {
        res.status(400).json({ message: "Verification failed. Incorrect decryption." });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  