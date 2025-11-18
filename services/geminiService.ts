
import { GoogleGenAI } from "@google/genai";

export const generateImages = async (prompt, numberOfImages, aspectRatio) => {
  // Assume API_KEY is set in the environment.
  if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: numberOfImages,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => img.image.imageBytes);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error generating images with Gemini:", error);
    throw new Error("Failed to generate images. Please check the console for details.");
  }
};
