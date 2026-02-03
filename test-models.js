import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
const apiKey = envConfig.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

async function listGenModelsStrict() {
    try {
        if (ai.models && typeof ai.models.list === 'function') {
            const response = await ai.models.list();
            const plain = JSON.parse(JSON.stringify(response));
            const models = plain.models || [];

            console.log("--- ANY Generation Model ---");
            models.forEach(m => {
                if (m.supportedActions && m.supportedActions.includes('generateContent')) {
                    console.log(m.name.replace('models/', ''));
                }
            });
            console.log("----------------------------");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listGenModelsStrict();
