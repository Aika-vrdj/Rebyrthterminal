"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateMessage(apiKey: string): Promise<string> {
  const prompt = `You are a survivor in the year 2103, posting a message after being reconnected to a global network for the first time in decades. The world has gone through major catastrophic events and society has been fragmented. Write a short message (1-3 sentences) that could be either hopeful, desperate, mysterious, or informative about your current situation. Be creative and vary the tone and content.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ERROR: Transmission corrupted...";
  }
}
