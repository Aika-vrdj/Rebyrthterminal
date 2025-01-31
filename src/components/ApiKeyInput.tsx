"use client";

import { useState } from "react";

interface ApiKeyInputProps {
  onKeySet: () => void;
}

export function ApiKeyInput({ onKeySet }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!apiKey) {
      setError("API key is required");
      return;
    }
    
    localStorage.setItem("gemini_api_key", apiKey);
    onKeySet();
  };

  return (
    <div className="w-96 rounded border border-green-500 bg-black p-6 font-mono text-green-500">
      <h2 className="mb-4 text-xl">SYSTEM ACCESS REQUIRED</h2>
      <p className="mb-4 text-sm">Enter Gemini API key to continue:</p>
      
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="mb-4 w-full border border-green-500 bg-black p-2 text-green-500 outline-none"
        placeholder="Enter your Google AI API key..."
      />
      
      {error && <p className="mb-4 text-red-500">{error}</p>}
      
      <button
        onClick={handleSubmit}
        className="w-full border border-green-500 bg-black p-2 text-green-500 hover:bg-green-900"
      >
        AUTHENTICATE
      </button>
    </div>
  );
}
