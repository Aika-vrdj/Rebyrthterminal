"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/Terminal";
import { ApiKeyInput } from "@/components/ApiKeyInput";

export default function HomePage() {
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = localStorage.getItem("gemini_api_key");
      setHasApiKey(!!key);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black p-4">
      {!hasApiKey ? (
        <div className="flex h-screen items-center justify-center">
          <ApiKeyInput onKeySet={() => setHasApiKey(true)} />
        </div>
      ) : (
        <Terminal />
      )}
    </main>
  );
}
