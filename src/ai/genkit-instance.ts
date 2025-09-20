
'use server';

import 'dotenv/config';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

let aiInstance: any;

/**
 * Returns a singleton instance of the Genkit AI.
 * This is an async function to comply with Next.js Server Action rules.
 * @returns {Promise<any>} The Genkit AI instance.
 */
export async function getAI() {
  if (!aiInstance) {
    aiInstance = genkit({
      plugins: [
        googleAI({
          apiKey: process.env.GEMINI_API_KEY,
        }),
      ],
      logLevel: 'debug',
      enableTracingAndMetrics: true,
    });
  }
  return aiInstance;
}
