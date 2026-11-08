'use server';
/**
 * @fileOverview A Genkit flow that generates a short, context-aware prompt or task suggestion.
 *
 * - generateFocusPrompt - A function that handles the focus prompt generation process.
 * - GenerateFocusPromptInput - The input type for the generateFocusPrompt function.
 * - GenerateFocusPromptOutput - The return type for the generateFocusPrompt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFocusPromptInputSchema = z.object({
  context: z
    .string()
    .optional()
    .describe('Optional context or current task to make the prompt more relevant.'),
});
export type GenerateFocusPromptInput = z.infer<typeof GenerateFocusPromptInputSchema>;

const GenerateFocusPromptOutputSchema = z.object({
  suggestion: z.string().describe('A short, context-aware prompt or task suggestion.'),
});
export type GenerateFocusPromptOutput = z.infer<typeof GenerateFocusPromptOutputSchema>;

export async function generateFocusPrompt(
  input: GenerateFocusPromptInput
): Promise<GenerateFocusPromptOutput> {
  return generateFocusPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFocusPromptPrompt',
  input: { schema: GenerateFocusPromptInputSchema },
  output: { schema: GenerateFocusPromptOutputSchema },
  prompt: `You are an AI assistant designed to help users initiate or regain focus.

Generate a short, actionable, and inspiring prompt or task suggestion to help the user focus.
If a context is provided, make the suggestion context-aware.

Context: {{{context}}}

Examples:
- "Take a deep breath, clear your mind, and list the top 3 tasks for the next 25 minutes."
- "Start with the most challenging bug first. Break it down into smaller, manageable steps."
- "Close all unnecessary tabs. What is the single most important task you need to complete right now?"
- "Review your progress on the current module. Where can you make the most impact in the next 30 minutes?"
- "Silence distractions. Dedicate the next 20 minutes to outlining your project report."

Make sure the suggestion is concise and directly helps to initiate or maintain focus.
`,
});

const generateFocusPromptFlow = ai.defineFlow(
  {
    name: 'generateFocusPromptFlow',
    inputSchema: GenerateFocusPromptInputSchema,
    outputSchema: GenerateFocusPromptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
