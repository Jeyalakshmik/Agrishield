
'use server';

/**
 * @fileOverview Filters animal intrusion alerts based on the detected animal type using an LLM.
 *
 * - filterAnimalIntrusionAlert - A function that filters animal intrusion alerts.
 * - FilterAnimalIntrusionAlertInput - The input type for the filterAnimalIntrusionAlert function.
 * - FilterAnimalIntrusionAlertOutput - The return type for the filterAnimalIntrusionAlert function.
 */

import { z } from 'genkit';
import { alerts } from '@/locales/alerts';
import { getAI } from '../genkit-instance';

const FilterAnimalIntrusionAlertInputSchema = z.object({
  animalType: z.string().describe('The type of animal detected.'),
  farmLocation: z.string().describe('The location of the farm.'),
  cropType: z.string().describe('The type of crop planted.'),
  language: z.string().describe('The user\'s current language code (e.g., en, ta, fr, ja)'),
});

export type FilterAnimalIntrusionAlertInput = z.infer<
  typeof FilterAnimalIntrusionAlertInputSchema
>;

const FilterAnimalIntrusionAlertOutputSchema = z.object({
  shouldAlert: z
    .boolean()
    .describe(
      'Whether an alert should be triggered based on the animal type and farm context.'
    ),
  reason: z.string().describe('The reason for the alert decision.'),
});

export type FilterAnimalIntrusionAlertOutput = z.infer<
  typeof FilterAnimalIntrusionAlertOutputSchema
>;

export async function filterAnimalIntrusionAlert(
  input: FilterAnimalIntrusionAlertInput
): Promise<FilterAnimalIntrusionAlertOutput> {
  const lang = input.language as keyof typeof alerts.intrusion;
  const ai = await getAI();

  const filterPrompt = ai.definePrompt({
    name: 'filterAnimalIntrusionPrompt',
    input: { schema: FilterAnimalIntrusionAlertInputSchema },
    output: { schema: FilterAnimalIntrusionAlertOutputSchema },
    prompt: `You are an AI assistant for a smart farming app called AgriShield. Your task is to determine if an animal intrusion poses a significant threat to a farm.

Based on the provided animal type, farm location, and primary crop, decide if an alert is warranted.

- High-threat animals for the specific crop should always trigger an alert.
- Consider the animal's typical diet and behavior. For example, deer eat crops, but a fox is a predator to smaller animals, not a direct crop threat.
- The 'reason' should be a concise, user-friendly explanation for your decision, localized to this language: {{{language}}}.

Animal Type: {{{animalType}}}
Farm Location: {{{farmLocation}}}
Crop Type: {{{cropType}}}
`,
  });

  try {
    const { output } = await filterPrompt(input);
    if (!output) {
      throw new Error('AI failed to provide an output.');
    }
    console.log(alerts.processed[lang]);
    return output;
  } catch (error) {
    console.error(alerts.error[lang], error);
    return {
        shouldAlert: false,
        reason: alerts.error[lang]
    };
  }
}
