"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [userDecryptedText, setUserDecryptedText] = useState("");
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
        decrypted_text: userDecryptedText.trim(),
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
    <div className="p-5 max-w-md mx-auto text-center bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Cryptic Challenge 🕵️‍♂️</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={fetchEncryptedText}
      >
        Fetch Encrypted Text
      </button>

      {encryptedText && (
        <div className="p-4 mt-6 bg-white rounded-lg shadow-md text-left">
          <h2 className="text-lg font-semibold text-gray-700">Encrypted Text:</h2>
          <p className="p-2 bg-gray-100 rounded mt-2">{encryptedText}</p>
          <h2 className="text-lg font-semibold text-gray-700 mt-4">Key:</h2>
          <p className="text-gray-600">{key}</p>
          <h2 className="text-lg font-semibold text-red-600 mt-4">Hint:</h2>
          <ul className="list-disc pl-5 text-blue-700 mt-2">
            <li>Each letter in the encrypted text is shifted by <strong>{key}</strong> positions in the alphabet.</li>
            <li>
              For example, if the encrypted letter is <strong>&apos;B&apos;</strong> and the key is <strong>1</strong>, the
              decrypted letter is <strong>&apos;A&apos;</strong>.
            </li>
            <li>
              If a letter goes beyond <strong>&apos;A&apos;</strong>, it wraps back to <strong>&apos;Z&apos;</strong> (for uppercase letters) or
              <strong>&apos;z&apos;</strong> to <strong>&apos;a&apos;</strong> (for lowercase letters).
            </li>
            <li>Spaces and special characters (e.g., punctuation) remain unchanged.</li>
          </ul>
          <h2 className="text-lg font-semibold text-orange-600 mt-4">Decrypted Text:</h2>
          <input
            type="text"
            placeholder="Enter Decrypted Text"
            className="w-full p-2 mt-2 border rounded"
            value={userDecryptedText}
            onChange={(e) => setUserDecryptedText(e.target.value)}
          />
        </div>
      )}

      {encryptedText && (
        <div className="p-4 mt-6 bg-white rounded-lg shadow-md text-left">
          <h2 className="text-lg font-semibold text-gray-700">Verify Your Details:</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mt-2 border rounded"
            value={userInput.name}
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mt-2 border rounded"
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            className="w-full p-2 mt-2 border rounded"
            value={userInput.phone}
            onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
          />
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={verifySolution}
          >
            Verify
          </button>
        </div>
      )}

      {message && <h2 className="mt-6 text-xl text-blue-600">{message}</h2>}
    </div>
  );
}
