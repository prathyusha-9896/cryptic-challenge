"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [userDecryptedText, setUserDecryptedText] = useState(""); // User's entered decrypted text
  const [userInput, setUserInput] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  const fetchEncryptedText = async () => {
    try {
      const response = await axios.get("/api/encrypt");
      setEncryptedText(response.data.encrypted_text);
      setKey(response.data.key);
    } catch (error) {
      console.error("Error fetching encrypted text:", error);
    }
  };

  const verifySolution = async () => {
    if (!userDecryptedText.trim() || !userInput.name.trim() || !userInput.email.trim() || !userInput.phone.trim()) {
      setMessage("All fields are required. Please fill in the decrypted text, name, email, and phone.");
      return;
    }
  
    try {
      const response = await axios.post("/api/verify", {
        decrypted_text: userDecryptedText.trim(), // Use user-entered text
        email: userInput.email.trim(),
        phone_number: userInput.phone.trim(),
        name: userInput.name.trim(),
        user_submitted_code: "Your code implementation here",
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error verifying solution:", error);
      setMessage(error.response?.data?.message || "Verification failed.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cryptic Challenge 🕵️‍♂️</h1>
      <button style={styles.primaryButton} onClick={fetchEncryptedText}>
        Fetch Encrypted Text
      </button>

      {encryptedText && (
        <div style={styles.card}>
            <h2>Encrypted Text:</h2>
            <p style={styles.encryptedText}>{encryptedText}</p>
            <h2 className="text-left"  style={styles.key}>Key: {key}</h2>
            <h2 className="text-red-600 text-left">Hint:</h2>
            <ul className="text-blue-700 text-left" style={styles.hintList}>
            <li >Each letter in the encrypted text is shifted by <strong>{key}</strong> positions in the alphabet.</li>
            <li>For example, if the encrypted letter is <strong>&apos;B&apos;</strong> and the key is <strong>1</strong>, the decrypted letter is <strong>&apos;A&apos;</strong>.</li>
            <li>If a letter goes beyond <strong>&apos;A&apos;</strong>, it wraps back to <strong>&apos;Z&apos;</strong> (for uppercase letters) or <strong>&apos;z&apos;</strong> to <strong>&apos;a&apos;</strong> (for lowercase letters).</li>
            <li>Spaces and special characters (e.g., punctuation) remain unchanged.</li>
            </ul>
            <h2 className="text-left text-orange-600">Decrypted Text:</h2>
            <input
            type="text"
            placeholder="Enter Decrypted Text"
            style={styles.input}
            value={userDecryptedText}
            onChange={(e) => setUserDecryptedText(e.target.value)}
            />
        </div>
        )}


      {encryptedText && (
        <div style={styles.card}>
          <h2>Verify Your Details:</h2>
          <input
            type="text"
            placeholder="Your Name"
            style={styles.input}
            value={userInput.name}
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={styles.input}
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            style={styles.input}
            value={userInput.phone}
            onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
          />
          <button style={styles.primaryButton} onClick={verifySolution}>
            Verify
          </button>
        </div>
      )}

      {message && <h2 style={styles.message}>{message}</h2>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    margin: "20px 0",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  encryptedText: {
    fontSize: "1.2rem",
    color: "#555",
    wordWrap: "break-word",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  },
  key: {
    fontSize: "1.2rem",
    color: "#888",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  primaryButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    fontSize: "1.2rem",
    color: "#007BFF",
    marginTop: "20px",
  },
};
