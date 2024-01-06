import * as z from "zod";

// Define a Zod schema for Character
export const CharacterValidation = z.object({
  author: z.string(), // Assuming author is a string (user ID)
  createdAt: z.date(), 
  image: z.string(), 
  characterName: z.string().min(1),
  motherland: z.string().min(1), 
  concept: z.string().min(1), 
  traits: z.string().min(1), 
  heightWeightAge: z.string().min(1), 
  backstory: z.string(),
  motivation: z.string(), 
  ideals: z.string(), 
  bonds: z.string(), 
  flaws: z.string().min(1), 
  reasonToJoin: z.string(), 
  family: z.string(), 
  playerPCs: z.string(), 
  Organisations: z.string(), 
});


