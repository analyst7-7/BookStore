
import { GoogleGenAI, Type } from "@google/genai";
import type { Book } from '../types';

// Assume API_KEY is set in the environment
// FIX: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY and assume it is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSimilarBooks = async (book: Book): Promise<Partial<Book>[]> => {
  // FIX: Per coding guidelines, the API key is assumed to be present. Removed redundant checks.
  try {
    // FIX: Corrected Hebrew word 'פורמט' to Bengali 'ফরম্যাট' in the prompt.
    const prompt = `"${book.title}" (লেখক: ${book.author}, ধরণ: ${book.genre}) বইটির উপর ভিত্তি করে ৪টি একই ধরণের বইয়ের সুপারিশ করুন। প্রতিটি বইয়ের জন্য একটি শিরোনাম, লেখক, একটি খুব ছোট এক বাক্যের ট্যাগলাইন এবং picsum.photos থেকে একটি ছবি URL দিন (ফরম্যাট: https://picsum.photos/seed/your-seed/400/600)। অনুগ্রহ করে সব প্রতিক্রিয়া বাংলা ভাষায় দিন।`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: "সুপারিশকৃত বইয়ের তালিকা।",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "সুপারিশকৃত বইয়ের শিরোনাম।"
                  },
                  author: {
                    type: Type.STRING,
                    description: "সুপারিশকৃত বইয়ের লেখক।"
                  },
                  tagline: {
                    type: Type.STRING,
                    description: "বইটির জন্য একটি ছোট, আকর্ষণীয় ট্যাগলাইন।"
                  },
                  coverImage: {
                    type: Type.STRING,
                    description: "picsum.photos থেকে বইয়ের কভার ছবির একটি URL।"
                  }
                },
                required: ["title", "author", "tagline", "coverImage"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.recommendations || [];
  } catch (error) {
    console.error("Error fetching similar books from Gemini API:", error);
    return [];
  }
};
