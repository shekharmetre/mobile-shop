// schemas/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Email: z.string().email("Invalid email"),
  Phone: z.string().min(10, "Phone must be at least 10 digits"),
  Message: z.string().optional(),
});


export type ContactFormType = z.infer<typeof contactSchema>;

export function zodFirstError(
  errors: Record<string, (string | undefined)[]>
): string | undefined {
  if (!errors || typeof errors !== 'object') return undefined;

  for (const key in errors) {
    const messages = errors[key];
    if (Array.isArray(messages)) {
      const firstValid = messages.find(Boolean);
      if (firstValid) return firstValid;
    }
  }

  return undefined;
}

