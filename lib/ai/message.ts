"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function refineMessage(message: string, themeBadge: string) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
      You are a romantic ghostwriter. Your task is to rewrite the user's message to be more poetic, emotional, lovely, sweetly and heartfelt.
      
      TONE: ${themeBadge}
      LIMIT: Under 300 characters but long enough for reading.
      STRICT RULE: Return ONLY the rewritten text. No introductions, no options, no bold titles, and no quotes.
      
      USER MESSAGE: "${message}"
      REWRITTEN MESSAGE:`;

  try {
    const result = await model.generateContent(prompt);
    return { text: result.response.text()};
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to refine message"
    }
  }
}