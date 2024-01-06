import * as z from "zod";

export const onboardingValidation =  z.object({
  username: z.string().min(3), // Assuming author is a string (user ID)
});