import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_VIDEOS, CHANNELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an intelligent entertainment assistant for an Apple TV-like operating system called GeminiOS.
You have access to a library of Videos and a list of Live TV Channels.
Your goal is to recommend videos or channels based on the user's mood, query, or random request.

The available video library is:
${JSON.stringify(MOCK_VIDEOS.map(v => ({ id: v.id, title: v.title, description: v.description, category: v.category })))}

The available live TV channels are:
${JSON.stringify(CHANNELS.map(c => ({ id: c.id, name: c.name, description: c.description, category: c.category })))}

When the user asks for a recommendation:
1. Analyze their request.
2. Select 1-3 most relevant videos OR 1 relevant channel.
3. Provide a friendly, short conversational response explaining why you chose them.
4. IMPORTANT: You must strictly return the lists of IDs.
`;

export const getGeminiRecommendations = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseText: {
              type: Type.STRING,
              description: "The conversational response to display to the user.",
            },
            recommendedVideoIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of video IDs recommended.",
            },
            recommendedChannelIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of channel IDs recommended.",
            }
          },
          required: ["responseText", "recommendedVideoIds", "recommendedChannelIds"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");
    
    return JSON.parse(jsonText) as { responseText: string; recommendedVideoIds: string[], recommendedChannelIds: string[] };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      responseText: "I'm having trouble connecting to the network right now. Please try again later.",
      recommendedVideoIds: [],
      recommendedChannelIds: [],
    };
  }
};