import { GoogleGenerativeAI } from "@google/generative-ai";
import { googleApiKey } from "../url";

const API_KEY = googleApiKey;
const genAI = new GoogleGenerativeAI(API_KEY);

async function getRecommendation(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-pro"
    })
    const query = `Can you please suggest me a title of 3 book based on the this mood ${prompt}`;

    const result = await model.generateContent(query);
    const response = await result.response;
    const text = await response.text();
    return text.split("\n");
}

export default getRecommendation;