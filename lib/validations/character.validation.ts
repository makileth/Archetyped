// character.validation.ts
import { z } from "zod";

const CharacterValidator = z.object({
  characterName: z.string().min(1, { message: "Character name is required." }),
  gender: z.string().min(1, { message: "Gender is required." }),
  concept: z.string().min(1, { message: "Concept is required." }),
  height: z.string().min(1, { message: "Height is required." }),
  age: z.string().min(1, { message: "Age is required." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  ideal: z.string().min(1, { message: "Ideal is required." }),
  race: z.string().min(1, { message: "Race is required." }),
  backstory: z
    .string()
    .min(30, { message: "Backstory is required." })
    .max(4000, { message: "The text is too long" }),
  motivation: z.string().min(1, { message: "Motivation is required." }),
  reasonToJoin: z.string().min(1, { message: "Reason to join is required." }),
  family: z.string().max(500, { message: "The text is too long" }),
  playerPCs: z.string().max(500, { message: "The text is too long" }),
  NPCs: z.string().max(500, { message: "The text is too long" }),
  organisations: z.string().max(500, { message: "The text is too long" }),
  description: z.string().max(500, { message: "The text is too long" }),
  motherland: z.string().min(1, { message: "Motherland is required." }),
  fears: z.string().min(1, { message: "Fears are required." }),
  habitsquirks: z.string().min(1, { message: "Habits/quirks are required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  deity: z.string().min(1, { message: "Deity is required." }),
  conflict: z.string().min(1, { message: "Conflict is required." }),
  catchphrase: z.string().min(1, { message: "Catchphrase is required." }),
  // secret: z.string().min(1, { message: "Secret is required." }),
});

export type CharSheetInputs = z.infer<typeof CharacterValidator>;
export default CharacterValidator;
