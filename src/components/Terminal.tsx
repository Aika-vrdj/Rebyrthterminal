"use client";

import { useEffect, useState, useRef } from "react";
import { generateMessage } from "@/lib/openai";

interface Message {
  id: number;
  text: string;
  timestamp: string;
  username: string;
}

export function Terminal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const addMessage = async () => {
    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem("gemini_api_key");
      if (!apiKey) return;

      const response = await generateMessage(apiKey);
      const newMessage: Message = {
        id: Date.now(),
        text: response,
        timestamp: new Date().toISOString(),
        username: `USER_${Math.floor(Math.random() * 9999)}`,
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageCount((prev) => prev + 1);
      
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Failed to generate message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messageCount >= 30) return;
    const interval = setInterval(addMessage, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="font-mono text-green-500 h-screen overflow-auto"
      style={{ textShadow: "0 0 5px rgba(0, 255, 0, 0.5)" }}
    >
      <div className="mb-4 text-center">
        <h1 className="text-2xl">GLOBAL NETWORK RECONNECTION TERMINAL</h1>
        <p className="text-sm">Year: 2103 | Status: ACTIVE | Protocol: SURVIVOR-NET</p>
      </div>
      
      {messages.map((message) => (
        <div key={message.id} className="mb-4 opacity-90 hover:opacity-100">
          <div className="flex items-center gap-2 text-green-300">
            <span>[{new Date(message.timestamp).toLocaleTimeString()}]</span>
            <span>{message.username}:</span>
          </div>
          <p className="ml-4 whitespace-pre-wrap">{message.text}</p>
        </div>
      ))}
      
      {messageCount < 30 ? (
        isLoading && (
          <div className="animate-pulse">
            <span className="inline-block">▊</span> Receiving transmission...
          </div>
        )
      ) : (
        <div className="text-red-500 mt-4 text-center">
          MAXIMUM MESSAGE LIMIT REACHED - TERMINAL LOCKED
        </div>
      )}
    </div>
  );
}
