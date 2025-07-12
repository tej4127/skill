// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered moderation of skill descriptions to flag inappropriate or spammy content.
 *
 * - moderateSkillDescription -  A function that moderates a skill description and flags it if it is inappropriate or spammy.
 * - ModerateSkillDescriptionInput - The input type for the moderateSkillDescription function.
 * - ModerateSkillDescriptionOutput - The output type for the moderateSkillDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateSkillDescriptionInputSchema = z.object({
  skillDescription: z
    .string()
    .describe('The skill description to be checked for inappropriate content.'),
});
export type ModerateSkillDescriptionInput = z.infer<
  typeof ModerateSkillDescriptionInputSchema
>;

const ModerateSkillDescriptionOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'True if the skill description is appropriate, false otherwise. Defaults to true.'
    )
    .default(true),
  reason: z
    .string()
    .optional()
    .describe(
      'The reason why the skill description was flagged as inappropriate.'
    ),
});
export type ModerateSkillDescriptionOutput = z.infer<
  typeof ModerateSkillDescriptionOutputSchema
>;

export async function moderateSkillDescription(
  input: ModerateSkillDescriptionInput
): Promise<ModerateSkillDescriptionOutput> {
  return moderateSkillDescriptionFlow(input);
}

const moderateSkillDescriptionPrompt = ai.definePrompt({
  name: 'moderateSkillDescriptionPrompt',
  input: {schema: ModerateSkillDescriptionInputSchema},
  output: {schema: ModerateSkillDescriptionOutputSchema},
  prompt: `You are an AI content moderator that helps determine the quality and safety of skill descriptions on a skill swapping platform.

  Review the following skill description and determine if it is appropriate for the platform.

  Skill Description: {{{skillDescription}}}

  Respond with whether the content is appropriate or not. If it is not appropriate, provide a reason.
  Be brief, accurate and to the point.
`,
});

const moderateSkillDescriptionFlow = ai.defineFlow(
  {
    name: 'moderateSkillDescriptionFlow',
    inputSchema: ModerateSkillDescriptionInputSchema,
    outputSchema: ModerateSkillDescriptionOutputSchema,
  },
  async input => {
    const {output} = await moderateSkillDescriptionPrompt(input);
    return output!;
  }
);
